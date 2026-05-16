import Joi from "joi";

export const createUserSchema = Joi.object({
    user_name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("Customer","Admin").required().default("Customer")
})


export const loginUserSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})