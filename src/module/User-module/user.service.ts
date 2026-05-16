import { sql } from "../../config/database/sql.connect.js";

export const getUserById = async(id: number) => {
    try{
        const data = await sql.query('SELECT * FROM users WHERE id = ? AND is_delete = FALSE', [id]);
        return data[0];
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const updateUser = async (id: number, updateData: any) => {
    try {
        const fields = Object.keys(updateData).map(key => `${key} = ?`).join(", ");
        console.log(fields);
        const values = Object.values(updateData);
        console.log(values);
        values.push(id);
        
        const data = await sql.query(`UPDATE users SET ${fields} WHERE id = ?`, values);
        return data[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteUser = async (id: number) => {
    try {
        console.log(id);
        const data = await sql.query('UPDATE users SET is_delete = TRUE WHERE id = ?', [id]);
        return data[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}