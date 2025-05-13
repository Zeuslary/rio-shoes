import { Voucher } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.json(vouchers);
        res.status(200).json(vouchers);
    } catch (err) {
        console.error(`Error fetching Voucher: ${err}`);
    }
};

export default {
    getAll,
};
