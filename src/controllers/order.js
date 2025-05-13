import { Order } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
        res.status(200).json(orders);
    } catch (err) {
        console.error(`Error fetching order: ${err}`);
    }
};

export default {
    getAll,
};
