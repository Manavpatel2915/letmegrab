import type { Request, Response } from "express";
import { getWalletByUserId, updateWalletBalance } from "./wallet.service.js";
import { redisClient, clearCachePattern } from "../../config/database/redis.connect.js";

export const getBalance = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.user.id;
        console.log("chcecking balace for user");
        const wallet = await getWalletByUserId(userId);
        
        if (!wallet || wallet.length === 0) {
            return res.status(404).json({ message: "not found" });
        }
        
        const { created_at, updated_at, ...walletData } = wallet[0];
        if (req.rediskey) {
            await redisClient.setEx(req.rediskey, 3600, JSON.stringify({ wallet: walletData }));
        }

        return res.status(200).json({
            message: "Wallet balance",
            wallet: walletData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "some error accour ", error });
    }
}

export const deposit = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.user.id;
        const { amount } = req.body;
        
        const walletRows = await getWalletByUserId(userId);
        if (!walletRows || walletRows.length === 0) {
            return res.status(404).json({ message: "not found" });
        }
        
        const wallet = walletRows[0];
        const currentBalance = Number(wallet.balance);
        const depositAmount = Number(amount);
        console.log(depositAmount);
        
        const newBalance = currentBalance + depositAmount;
        await updateWalletBalance(userId, newBalance);
        
        await clearCachePattern(`user:${userId}*wallet*`);

        return res.status(200).json({
            message: "Deposit successful",
            newBalance
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "some error accour", error });
    }
}

export const withdraw = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.user.id;
        const { amount } = req.body;
        
        const walletRows = await getWalletByUserId(userId);
        if (!walletRows || walletRows.length === 0) {
            return res.status(404).json({ message: "not found" });
        }
        
        const wallet = walletRows[0];
        const currentBalance = Number(wallet.balance);
        const withdrawAmount = Number(amount);
        
        if (currentBalance < withdrawAmount) {
            return res.status(400).json({ message: "not that much amount balance" });
        }
        
        const newBalance = currentBalance - withdrawAmount;
        await updateWalletBalance(userId, newBalance);
        console.log(newBalance);
        
        await clearCachePattern(`user:${userId}*wallet*`);

        return res.status(200).json({
            message: "Withdrawal successful",
            newBalance
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}
