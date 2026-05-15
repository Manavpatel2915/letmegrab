import dotenv from "dotenv";
dotenv.config();

const PROCESSENV = process.env;

function getEnvValue(name: string) : string{
   const value = PROCESSENV[name];
   if(!value) {
    throw new Error(`environment variable ${name} not exist`);
   }
   return value;
}

export const env = {
    PORT: getEnvValue("PORT"),
    DB: {
        DB_USER: getEnvValue("DB_USER"),
        DB_PASSWORD : getEnvValue("DB_PASSWORD"),
        DB_HOST : getEnvValue("DB_HOST"),
        DB_PORT : getEnvValue("DB_PORT"),
        DB_NAME : getEnvValue("DB_NAME")
    },
    JWT : {
        JWT_SECRET: getEnvValue("JWT_SECRET"),
        TOKEN_EXPIRY: getEnvValue("TOKEN_EXPIRY"),
        SALT: getEnvValue("SALT"),
    }
}
