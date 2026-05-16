import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../../config/env.config.js";
import type { Request, Response } from "express";
import {
    findUserByEmail,
    creatUser,
    createWallet
} from "./auth.service.js"
import { sendMail } from "../../utils/mailer.js";
const JWT_SECRET = env.JWT.JWT_SECRET as string;
const TOKEN_EXPIRY = env.JWT.TOKEN_EXPIRY as string;

export const register = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const {
        user_name,
        email,
        password,
        role
    } = req.body

    if (!user_name || !email || !password || !role) {
        return res.status(400).json({
            message: "All are required"
        })
    }
    console.log(email);
    const existingUser = await findUserByEmail(email) as any[];
    if (existingUser && existingUser.length > 0) {
        return res.status(400).json({
            message: "User exists already"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await creatUser(
        user_name,
        email,
        hashedPassword,
        role
    )

    const userId = (newUser as any).insertId;
    
    await createWallet(userId);

    console.log( email);
    await sendMail(email, "this is about account create", "your account is created");

    const token = jwt.sign(
        {
            id: userId,
            role: role
        }, JWT_SECRET as string,
        {
            expiresIn: TOKEN_EXPIRY as "1d"
        }
    );


    return res.status(200).json({
        message: "User registered ", token
    });
}

export const login = async(
    req: Request,
    res: Response,
) : Promise<Response> => {
    const {
        email,
        password,
    } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"All are required"
        })
    }
    console.log(email);
    const users = await findUserByEmail(email) as any[];
    if(!users || users.length === 0){
        return res.status(404).json({
            message:"User not found"
        })
    }
    const user = users[0];
    const isMatched = await bcrypt.compare(password, user.password as string);
    if(!isMatched) {
        return res.status(400).json({
            message:"password not matched"
        })
    }
    const token = jwt.sign(
        {
            id:user.id,
            role:user.role
        },JWT_SECRET as string,
        {
            expiresIn:TOKEN_EXPIRY as "1d"
        }
    );
    return res.status(200).json({
        message:"User logged in",token
    });
}
        