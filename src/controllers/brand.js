import { Brand } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const brands = await Brand.find();
        console.log(brands);
        res.json(brands);
        res.status(200).json(brands);
    } catch (err) {
        console.error(`Error fetching brands: ${err}`);
        res.status(500).json({ error: 'Failed to fetch brands' }); // <- Add this
    }
};

export default {
    getAll,
};
