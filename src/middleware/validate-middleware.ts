import type { Request , Response, NextFunction} from "express";
import type{ Schema } from "joi";

export const validate = (
    (schema : Schema , property: "body" | "query" | "params") => 
    (req: Request , res: Response , next: NextFunction) => {
        const { error , value } = schema.validate(req[property]);

        if(error) {
            return res.status(400).json({
                message: `${error.message}`
            })
        }

        req[property] = value;
        next();
    }
)