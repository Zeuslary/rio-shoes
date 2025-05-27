import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // Get token
    const token = req.headers.authorization?.split(' ')[1];

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

export default verifyToken;
