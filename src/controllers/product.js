import Product from '../models/Product.js';

const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
        res.status(200).json(products);
    } catch (err) {
        console.error(`Error fetching products: ${err}`);
    }
};

export default {
    getAll,
};
