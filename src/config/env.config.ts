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
    PORT: getEnvValue("PORT")

}
