import { Shipping } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const shippings = await Shipping.find();
        res.json(shippings);
        res.status(200).json(shippings);
    } catch (err) {
        console.error(`Error fetching shippings: ${err}`);
    }
};

export default {
    getAll,
};
