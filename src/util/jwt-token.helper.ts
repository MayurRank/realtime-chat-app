import "dotenv/config";
import jwt from "jsonwebtoken";
const SECRET: any = process.env.SECRET;

// Generate token using payload and expiry
export const generateToken = (data: any, options: jwt.SignOptions) => {
    return jwt.sign(data, `${SECRET}`, options)
};

// Verify JWT token
export const verifyToken = (token: string) => {
    return jwt.verify(token, `${SECRET}`);
};