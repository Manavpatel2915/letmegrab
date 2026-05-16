import { sql } from "../../config/database/sql.connect.js";

export const getWalletByUserId = async (userId: number) => {
    console.log(userId);
    const data = await sql.query('SELECT * FROM wallets WHERE user_id = ?', [userId]);
    return data[0] as any[];
}

export const updateWalletBalance = async (userId: number, newBalance: number) => {
    console.log("newBalance", newBalance);
    const data = await sql.query('UPDATE wallets SET balance = ? WHERE user_id = ?', [newBalance, userId]);
    return data[0];
}
