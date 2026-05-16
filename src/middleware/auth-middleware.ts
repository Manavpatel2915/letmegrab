import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import type { Request , Response , NextFunction } from "express";

export type AuthUser ={
    id: number;
    role: string;
}

export const authenticate = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({
            message: "missing authHeader"
        })
    }
    const token = authHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            message: "token is missing please send attech it with header"
        })
    }
    try {
        const decoded = jwt.verify(token, env.JWT.JWT_SECRET);
        req.user = decoded as AuthUser;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }

    
}