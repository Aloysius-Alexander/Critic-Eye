import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret_key = process.env.JWT_SECRET;

// Function to generate a token for users
export const generateToken = (email) => {
    return jwt.sign({ data: email }, secret_key, { expiresIn: "1d" });
};

// Function to generate a token for admin
export const adminToken = (admin) => {
    return jwt.sign({ data: admin.name, email: admin.email }, secret_key, {
        expiresIn: "1d",
    });
};
