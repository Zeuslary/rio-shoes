import { ProductImport } from '../models/index.js';

const getAll = async (req, res) => {
    try {
        const productImports = await ProductImport.find();
        console.log('Fetched product imports:', productImports);
        res.json(productImports);
        res.status(200).json(productImports);
    } catch (err) {
        console.error(`Error fetching product imports: ${err}`);
    }
};

export default {
    getAll,
};
