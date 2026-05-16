import mysql from 'mysql2';
import { env } from "../env.config.js";

const config = {
    host : env.DB.DB_HOST,
    port : Number(env.DB.DB_PORT),
    user: env.DB.DB_USER,
    password : env.DB.DB_PASSWORD,
    database: env.DB.DB_NAME,
    waitForConnections:true,
    connectionLimit: 10,
    queueLimit : 0,
    multipleStatements: true
}

const pool = mysql.createPool(config);

export const sql = pool.promise();

export const sqlConnect = async () => {
    try {
        const connection = await sql.getConnection();
        connection.release();
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};  