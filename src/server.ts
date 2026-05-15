import express from "express";
import { env } from "./config/env.config.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin:"*"
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = Number(env.PORT);

app.listen(PORT,()=> {
    console.log(`server is running on ${PORT}`);
})
