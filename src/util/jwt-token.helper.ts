import "dotenv/config";
import jwt from "jsonwebtoken";
const SESSION_SECRET: any = process.env.SESSION_SECRET;


// Generate token using payload and expiry
export const generateToken = (data: any, options: jwt.SignOptions) => {
    return jwt.sign(data, SESSION_SECRET, options)
};

// Verify JWT token
export const verifyToken = (token: string) => {
    return jwt.verify(token, SESSION_SECRET);
};