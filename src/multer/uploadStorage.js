import multer from 'multer';
import { UPLOAD_FOLDERS } from '../constants/index.js';

// Configure local storage to save files
const storage = (folder) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            // new Date().toISOString return a string
            //  format: YYYY-MM-DDTHH:mm:ss.ssssZ, use this to make file name
            // /:/g, '-': replace all : with - (to avoid error file name)
            // / /g, '_': replace all space with _
            cb(
                null,
                new Date().toISOString().replace(/:/g, '-').replace(/ /g, '_') +
                    '-' +
                    file.originalname,
            );
        },
    });
};

const admins = multer({ storage: storage(UPLOAD_FOLDERS.admin) });
const products = multer({ storage: storage(UPLOAD_FOLDERS.product) });

export default {
    admins,
    products,
};
