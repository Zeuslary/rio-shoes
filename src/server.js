import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import {
    brandRouters,
    adminRouters,
    productRouters,
    paymentRouters,
    shippingRouters,
    productImportRouters,
    customerRouters,
    voucherRouters,
    orderRouters,
} from './routes/index.js';

// Get global variable from file .env
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 5000;

// Running backend
const app = express();

// Allow requests from only React frontend
// port 5173 is your vite app running
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    }),
);

// Public static file
const __dirname = path.resolve();
app.use('/static', express.static(path.join(__dirname, 'src/assets/images')));

// This is middleware tells Express automatically parse incoming request
//  with JSON payloads, and make the data available on req.body
//  If don't include this, when client sends JSON data to server, server
//  won't able to read (req.body = undefined)
app.use(express.json());

// Allow pass data base on x-www-form-urlencoded to test in Postman
app.use(express.urlencoded({ extended: true }));

// -------- ROUTER ---------
// Make router for brands
app.use('/api/brand', brandRouters);

// Make router for admins
app.use('/api/admin', adminRouters);

// Make router for products
app.use('/api/product', productRouters);

// Make router for payments
app.use('/api/payment', paymentRouters);

// Make router for shippings
app.use('/api/shipping', shippingRouters);

// Make router for product imports
app.use('/api/product-import', productImportRouters);

// Make router for customers
app.use('/api/customer', customerRouters);

// Make router for vouchers
app.use('/api/voucher', voucherRouters);

// Make router for orders
app.use('/api/order', orderRouters);

// Make function to Connect to MongoDB
const connect = async () => {
    await mongoose
        .connect(MONGODB_URL)
        .then(() => {
            console.log('MongoDB connected');

            // Start server
            app.listen(PORT, () => {
                console.log(`Server is running at http://localhost:${PORT}`);
            });
        })
        .catch((err) => {
            console.error('MongoDB connection failed:', err.message);
        });
};

// Start connect
connect();
