import { Brand } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const brands = await Brand.find();
        console.log(brands);
        res.status(200).json(brands); // send status code is 200 and the data base on json format
    } catch (err) {
        console.error(`Error fetching brands: ${err}`);
        res.status(500).json({ error: 'Failed to fetch brands' }); // <- Add this
    }
};

export default {
    getAll,
};
