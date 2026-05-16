import { sql } from "../../config/database/sql.connect.js";

export const findUserByEmail = async (email: string) => {
    const data = await sql.query(`SELECT * FROM users WHERE email = ? AND is_delete = FALSE`, [email])
    return data[0]
}

export const creatUser = async (
    user_name: string,
    email: string,
    password: string,
    role: string
) => {
    console.log(user_name);
    const data = await sql.query(`insert into users(user_name,email, password, role) values(?,?,?,?)`, [
        user_name,
        email,
        password,
        role
    ]);
    return data[0];
}

export const createWallet = async (userId: number) => {
    const data = await sql.query(`insert into wallets(user_id, balance) values(?,?)`, [
        userId,
        0.00
    ]);
    return data[0];
}