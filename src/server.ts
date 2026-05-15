import express from "express";
import { env } from "./config/env.config.js";
import { sql, sqlConnect } from "./config/database/sql.connect.js"; 
import { models } from "./config/database/models/sql.model.js";
import cors from "cors";

const app = express();
const PORT = Number(env.PORT);

(async () => {
    try {
        await sqlConnect();
        await sql.query(models);


        
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors({
            origin: "*"
        }));

        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
        })

    } catch (error) {
        console.log("sql connection failed", error);
    }   
})();

