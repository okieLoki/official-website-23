import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decode) {
            res.status(401).json({
                status: 'Invalid Token'
            });
        }
        next();
    } catch (error) {
        res.status(401).json({
            status: 'Invalid Token'
        });
    }
};

export default auth;