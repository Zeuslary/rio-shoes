import jwt from 'jsonwebtoken';
import { ROLES } from '../constants/index.js';

const verifyToken = (req, res, next) => {
    console.log('Verify token running...');
    // Get token
    const token = req.headers.authorization?.split(' ')[1];

    console.log('Token: ', token);

    if (!token)
        return res.status(401).json({
            message: 'Access denied. No token provided.',
        });

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach info of token to field user of req
        req.user = decoded;

        // verify pass and switch to next handle
        next();
    } catch (err) {
        console.error('Token verify failed...', err);
        return res.status(401).json({
            message: 'Token verify error!',
        });
    }
};

const verifyTokenAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token)
        return res.status(401).json({
            message: 'Access denied. No token provided.',
        });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        console.log('Decoded token admin: ', decode);

        // Check role
        if (!ROLES.includes(decode.role))
            return res.status(403).json({
                message: 'You do not have permission to access this resource.',
            });

        // Attach info of token to field user of req
        req.admin = decode;

        // Switch to next handle
        next();
    } catch (err) {
        console.error('Token verify failed...', err);

        if (err instanceof jwt.TokenExpiredError)
            return res.status(401).json({
                message: 'Token is expired!',
            });

        return res.status(401).json({
            message: 'Token verify error!',
        });
    }
};

const verifyTokenCustomer = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token)
        return res.status(401).json({
            message: 'Access denied. No token provided.',
        });

    try {
        // Verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        console.log('Decoded token user: ', decode);

        req.user = decode;

        // Switch to next handle
        next();
    } catch (err) {
        console.error('Token verify failed...', err);

        // Handle error token is expired
        if (err instanceof jwt.TokenExpiredError) {
            console.log('Token is expired!');

            return res.status(401).json({
                message: 'Token is expired!',
            });
        }

        return res.status(401).json({
            message: 'Token verify error!',
        });
    }
};

export default verifyToken;
export { verifyTokenAdmin, verifyTokenCustomer };
