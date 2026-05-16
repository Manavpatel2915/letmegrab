import express from "express";
import { env } from "./config/env.config.js";
import { sql, sqlConnect } from "./config/database/sql.connect.js"; 
import { connectRedis } from "./config/database/redis.connect.js";
import { models } from "./config/database/models/sql.model.js";
import cors from "cors";
import router from "./routes/index.route.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.config.js";

const app = express();
const PORT = Number(env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*"
}));   

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router(app);

(async () => {
    try {
        await sqlConnect();
        await connectRedis();
        await sql.query(models);

        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
        })

    } catch (error) {
        console.log("sql connection failed", error);
    }   
})();

