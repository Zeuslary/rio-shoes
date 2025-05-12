import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello from Rio Shoes API');
});

mongoose
    .connect('mongodb://localhost:27017/rio_shoes_dev')
    .then(() => {
        console.log('MongoDB connected');

        // Start server
        app.listen(5000, () => {
            console.log('Server is running at http:localhost:5000');
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err.message);
    });
