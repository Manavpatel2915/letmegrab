import { Router } from "express";
import {
    register,
    login
} from "./auth.controller.js"
import { createUserSchema,loginUserSchema } from "./auth.validation.js";
import { validate } from "../../middleware/validate-middleware.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: register new userhere
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post("/register",validate(createUserSchema,"body"),register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login api
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 */
router.post("/login",validate(loginUserSchema,"body"),login)

export default router ;