import { Customer } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
        res.status(200).json(customers);
    } catch (err) {
        console.error(`Error fetching Customers: ${err}`);
    }
};

export default {
    getAll,
};
