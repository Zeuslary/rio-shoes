import jwt from 'jsonwebtoken';

import { Admin } from '../models/index.js';

const login = async (req, res) => {
    try {
        console.log('Login admin...', req.body);
        const { username, password } = req.body;

        if (!req.body)
            return res.status(400).json({
                message: 'Empty request body',
            });

        if (!username || !password)
            return res.status(400).json({
                message: 'Username and password are required',
                data: req.body,
            });

        const auth = await Admin.findOne({
            username,
            password,
        });

        if (!auth)
            return res.status(400).json({
                message: 'Invalid username or password!',
                data: req.body,
            });

        // Update lastLogin timestamp
        auth.lastLogin = new Date();
        await auth.save();

        // Remove password from response
        auth.password = undefined;

        // Add field getFullName
        auth._doc.getFullName = auth.getFullName;

        // console.log('JWT: ', jwt);
        // console.log('Auth: ', auth);

        // Generate JWT token
        //  jwt.sign(payload, secretKey, options)
        const token = jwt.sign(
            {
                id: auth._id,
                ...auth.toObject(),
            },
            // Use a secure secret key in production
            process.env.JWT_SECRET || 'mySecretKey',
            {
                // Set token expiration time
                expiresIn: process.env.JWT_EXPIRATION || '1d',
            },
        );

        return res.status(200).json({
            message: 'Login successfully!',
            token,
            data: auth,
        });
    } catch (err) {
        console.error('Login admin failed...', err);
        return res.status(500).json({
            message: 'Internal Server Error!',
        });
    }
};

export default {
    login,
};
