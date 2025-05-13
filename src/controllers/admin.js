import { Admin } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
        res.status(200).json(admins);
    } catch (err) {
        console.error(`Error fetching admins: ${err}`);
    }
};

export default {
    getAll,
};
