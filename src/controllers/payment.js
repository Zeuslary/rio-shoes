import { Payment } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
        res.status(200).json(payments);
    } catch (err) {
        console.error(`Error fetching payments: ${err}`);
    }
};

export default {
    getAll,
};
