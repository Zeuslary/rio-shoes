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

// Search orders base on phone
const filterByPhone = async (req, res) => {
    try {
        const { phone } = req.query;

        if (!phone)
            return res.status(400).json({
                message: 'Phone is required!',
            });

        const customer = await Customer.findOne({ phone });

        if (!customer)
            return res.status(404).json({
                message: 'Order not found!',
            });

        const orders = await Order.find({
            customerId: customer._id,
        })
            .populate('shippingId', 'name')
            .populate('paymentId', 'name');

        // Add field img for each item of order
        for (const order of orders) {
            for (const item of order.items) {
                const product = await Product.findById(item._id);

                item._doc.image = product.image;
            }
        }

        return res.status(200).json({
            message: 'Filter order successfully!',
            data: orders,
        });
    } catch (err) {
        console.error('Filter order failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

// Get orders base on customerId
const getByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.query;

        if (!customerId)
            return res.status(400).json({
                message: 'Customer ID is required!',
            });

        if (!mongoose.Types.ObjectId.isValid(customerId))
            return res.status(400).json({
                message: 'Invalid customer ID!',
                data: customerId,
            });

        const orders = await Order.find({
            customerId,
        });

        if (orders.length <= 0)
            return res.status(204).json({
                message: 'Order not found!',
            });

        // Add field image each item of order items
        for (const order of orders) {
            for (const item of order.items) {
                const product = await Product.findById(item._id).select('image');

                item._doc.image = product.image;
            }
        }

        console.log('Order: ', orders);
        return res.status(200).json({
            message: ' Get orders base on customer ID successfully!',
            data: orders,
        });
    } catch (err) {
        console.error('Get orders by customer Id failed...', err);
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

        const { profile, items, discount, payment, shipping } = req.body;

        // console.log('profile: ', profile);
        // console.log('items: ', items);
        // console.log('discount: ', discount);
        // console.log('payment: ', payment);
        // console.log('shipping: ', shipping);

        if (!items || !profile || !shipping || !payment)
            return res.status(400).json({
                message: 'Items, profile, shipping and payment are required!',
            });

        let customer;

        let isExistCustomer = false;

        // Check is exist profile -> find customer corresponding
        if (profile?._id) {
            customer = await Customer.findById(profile._id);

            if (customer) {
                isExistCustomer = true;
            }
        }

        // If not exist customer -> create a customer and get customerId
        if (!isExistCustomer) {
            customer = new Customer({
                fullName: {
                    firstName: profile?.fullName?.firstName,
                    lastName: profile?.fullName?.lastName,
                },
                phone: profile?.phone,
                email: profile?.email,
                address: {
                    city: profile?.address?.city,
                    district: profile?.address?.district,
                    ward: profile?.address?.ward,
                    houseNumber: profile?.address?.houseNumber,
                },
                lastOrderDate: Date.now(),
            });

            delete customer.username;
            delete customer.password;
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
            address: { ...profile.address },
            message: profile?.message,
            statusDate: {
                shipping: '',
                delivered: '',
                completed: '',
                cancelled: '',
            },
        });

        console.log('New customer: ', customer);

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

        // console.log('item add: ', itemsAdd);
        // console.log('Subtotal: ', subTotal);
        // console.log('total: ', total);
        // console.log('newOrder: ', newOrder);

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
        })
            .populate('customerId', 'fullName email phone')
            .populate('paymentId', 'name');

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

// Search base on name and status
// GET /api/orders?name=Nike&status=delivered,shipping
const search = async (req, res) => {
    try {
        const { name, status } = req.query;

        const keyword = name?.trim();
        const statusList = status?.slit(',');

        const query = {};

        if (keyword) {
            query.items = {
                $elemMatch: {
                    name: { $regex: keyword, $options: 'i' },
                },
            };
        }

        if (statusList?.length > 0) {
            query.status = { $in: statusList };
        }

        const orders = await Order.find(query).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            message: 'Search order successfully!',
            data: orders,
        });
    } catch (err) {
        console.error('Search order failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

export default {
    getAll,
    getById,
    filterByPhone,
    getByCustomerId,
    create,
    deleteById,
    updateById,
    search,
};
