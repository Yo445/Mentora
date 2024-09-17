import 'dotenv/config';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return {
        accessToken: jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION }),
        refreshToken: jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION })
    }
}

export default generateToken;