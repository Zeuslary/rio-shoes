import mongoose from 'mongoose';

import nestObject from '../utils/nestObject.js';
import { Customer, Order, Product } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customerId', 'fullName email phone')
            .populate('paymentId', 'name')
            .populate('shippingId', 'name');

        console.log('Orders: ', orders);

        // Add field customerName for each order
        // Add field addressDetail for each order
        // Each item will add image
        for (const order of orders) {
            order._doc.customerName = order.customerId?.getFullName;
            order._doc.addressDetail = order?.getAddressDetail;

            // Add image for each item.
            // Use for - of instead of map to avoid not await result
            for (const item of order.items) {
                const product = await Product.findById(item._id).select('image');

                if (product) item._doc.image = product.image;
            }
        }

        return res.status(200).json(orders);
    } catch (err) {
        console.error(`Fetching all order failed...`, err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid ID',
                data: id,
            });

        const order = await Order.findById(id)
            .populate('customerId', 'fullName phone email')
            .populate('shippingId', 'name')
            .populate('paymentId', 'name');

        // Add img for each item
        for (const item of order.items) {
            const product = await Product.findById(item._id).select('name image');

            if (product) item._doc.image = product.image;
        }

        if (order)
            return res.status(200).json({
                message: 'Find order successfully!',
                data: order,
            });

        return res.status(404).json({
            message: 'Order not found!',
            data: id,
        });
    } catch (err) {
        console.error('Find order failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

// Create
const create = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).json({
                message: 'Empty body',
            });

        const { profile, contactInfo, items, discount, payment, shipping } = req.body;

        // console.log('contactInfo: ', contactInfo);
        // console.log('items: ', items);
        // console.log('discount: ', discount);
        // console.log('payment: ', payment);
        // console.log('shipping: ', shipping);
        // console.log('profile: ', profile);

        if (!items || !contactInfo || !shipping || !payment)
            return res.status(400).json({
                message: 'Items, contact info, shipping and payment are required!',
            });

        let customer;

        let isExistCustomer = false;

        // Check is exist profile -> find customer corresponding
        if (profile) {
            customer = await Customer.findById(profile._id);

            if (customer) {
                isExistCustomer = true;
            }
        }

        // If not exist customer -> create a customer and get customerId
        if (!isExistCustomer) {
            customer = new Customer({
                fullName: {
                    firstName: contactInfo?.fullName?.firstName,
                    lastName: contactInfo?.fullName?.lastName,
                },
                phone: contactInfo?.phone,
                email: contactInfo?.email,
                address: {
                    city: contactInfo?.address?.city,
                    district: contactInfo?.address?.district,
                    ward: contactInfo?.address?.ward,
                    houseNumber: contactInfo?.address?.houseNumber,
                },
                lastOrderDate: Date.now(),
            });
        }

        const subTotal = items.reduce(
            (total, item) => (total += item.quantity * item.newPrice),
            0,
        );
        const total = subTotal + shipping?.price - (discount?.discountValue || 0);

        const itemsAdd = items.map((item) => ({
            _id: item._id,
            name: item.name,
            size: item.size,
            color: item.color,
            price: item.newPrice,
            quantity: item.quantity,
        }));

        // Add order
        const newOrder = new Order({
            customerId: customer._id,
            items: itemsAdd,
            paymentId: payment._id,
            shippingId: shipping._id,
            summary: {
                subTotal,
                shippingFee: shipping?.price,
                discount: discount?.discountValue,
                voucherId: discount?._id,
                total,
            },
            address: { ...contactInfo.address },
            message: contactInfo?.message,
            statusDate: {
                shipping: '',
                delivered: '',
                completed: '',
                cancelled: '',
            },
        });

        // Save to db
        await customer.save();
        await newOrder.save();

        // Update stock, sold of product
        for (const item of itemsAdd) {
            const product = await Product.findById(item._id);

            if (product) {
                product.stock -= item.quantity;
                product.sold = product.sold + item.quantity;
                await product.save();
            }
        }

        // Update data of customer
        customer.orderCount++;
        customer.totalSpent += newOrder.summary.total;
        customer.lastOrderDate = newOrder.createdAt;
        await customer.save();

        console.log('item add: ', itemsAdd);
        console.log('Subtotal: ', subTotal);
        console.log('total: ', total);
        console.log('newOrder: ', newOrder);

        return res.status(201).json({
            message: 'Create order successfully!',
            data: newOrder,
        });
    } catch (err) {
        console.error('Create order failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid ID',
                data: id,
            });

        const deleteOrder = await Order.findByIdAndDelete(id);

        if (deleteOrder) {
            // Update stock, quantity when delete a order
            for (let item of deleteOrder.items) {
                const product = await Product.findById(item._id);

                if (product) {
                    product.stock += item.quantity;
                    product.sold -= item.quantity;

                    await product.save();
                }
            }

            // Update orderCount, totalSpent of customer corresponding
            const customer = await Customer.findById(deleteOrder.customerId);
            if (customer) {
                customer.orderCount--;
                customer.totalSpent -= deleteOrder.summary.total;
                customer.lastOrderDate = '';

                await customer.save();
            }

            return res.status(200).json({
                message: 'Delete order successfully!',
                data: deleteOrder,
            });
        }

        return res.status(400).json({
            message: 'Order not found!',
            data: id,
        });
    } catch (err) {
        console.error('Delete order failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                message: 'Invalid Id',
                data: id,
            });

        if (!req.body)
            return res.status(400).json({
                message: 'Empty body',
            });

        const data = nestObject(req.body);

        // Handle status base on status date
        if (data?.statusDate?.cancelled) data.status = 'cancelled';
        else if (data?.statusDate?.completed) data.status = 'completed';
        else if (data?.statusDate?.delivered) data.status = 'delivered';
        else if (data?.statusDate?.shipping) data.status = 'shipping';
        else data.status = 'pending';

        const updateOrder = await Order.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).populate('customerId', 'fullName email phone');

        if (updateOrder) {
            // Add field customerName and addressDetail for order
            updateOrder._doc.customerName = updateOrder.customerId?.getFullName;
            updateOrder._doc.addressDetail = updateOrder?.getAddressDetail;

            console.log('Body: ', data);

            console.log('Update order: ', updateOrder);

            return res.status(200).json({
                message: 'Update order successfully!',
                data: updateOrder,
            });
        }

        return res.status(400).json({
            message: 'Update order error',
            data: data,
        });
    } catch (err) {
        console.error('Update order failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

export default {
    getAll,
    getById,
    create,
    deleteById,
    updateById,
};
