import type { Request , Response } from "express";
import { getUserById, updateUser, deleteUser } from "./user.service.js";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../auth-module/auth.service.js";
import { redisClient, clearCachePattern } from "../../config/database/redis.connect.js";


export const UserProfile = async (
    req: Request,
    res: Response
) : Promise<Response> => {
    try{
        const userId = req.user.id;
        if(!userId) {
            return res.status(400).json({
                message: "userId not found!!!"
            });
        }

        console.log("fetching user profile id", userId);
        const user = await getUserById(userId) as any[];
        if(!user || user.length === 0){
            return res.status(404).json({
                message: "not found"
            })
        }
        const { role, created_at, updated_at, is_delete, ...userData } = user[0];
        if (req.rediskey) {
            await redisClient.setEx(req.rediskey, 3600, JSON.stringify({ user: userData }));
        }

        return res.status(200).json({
            message:"user data",
            user: userData
        })

    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            message:"some error accur",
            error: error 
        })
    }
}


export const updateUserProfile = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id = Number(req.params.id);
        const authUser = req.user.id;
        const user = await getUserById(id) as any[];
        if(!user || user.length === 0){
            return res.status(404).json({
                message: "not found"
            })
        }
        if (authUser !== id && req.user.role !== 'Admin') {
            return res.status(403).json({
                message: "you can not update this user profile"
            });
        }
        console.log(id);
        if (req.body.email) {
            const existingUser = await findUserByEmail(req.body.email) as any[];
            if (existingUser && existingUser.length > 0 && existingUser[0].id !== id) {
                return res.status(400).json({
                    message: "email already exits"
                });
            }
        }

        const updateData = { ...req.body };
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        await updateUser(id, updateData);
        
        await clearCachePattern(`user:${id}*`);

        return res.status(200).json({
            message: "user updated successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "some error occur",
            error: error
        });
    }
}

export const deleteUserProfile = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id = Number(req.params.id);
        const authUser = req.user.id;

        if (authUser !== id && req.user.role !== 'Admin') {
            return res.status(403).json({
                message: "you can't delete this user profile "
            });
        }

         console.log(authUser);
         await deleteUser(id);
        
         await clearCachePattern(`user:${id}*`);

        return res.status(200).json({
            message: "account deleted"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "some error accur",
            error: error
        });
    }
}
