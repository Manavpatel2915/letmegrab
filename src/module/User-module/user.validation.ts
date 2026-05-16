import Joi from "joi";

export const updateUserSchema = Joi.object({
    user_name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(20),
}).min(1);
