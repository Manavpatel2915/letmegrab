import { Router } from "express";
import { authenticate } from "../../middleware/auth-middleware.js";
import { getCachedData } from "../../middleware/redis-middleware.js";
import { validate } from "../../middleware/validate-middleware.js";
import { updateUserSchema } from "./user.validation.js";
import {
    UserProfile,
    updateUserProfile,
    deleteUserProfile
} from "../User-module/user.controller.js"

const router = Router();

/**
 * @swagger
 * /user/:
 *   get:
 *     summary: get user data api
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: user data
 */
router.get("/", authenticate, getCachedData, UserProfile);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
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
 *     responses:
 *       200:
 *         description: user updated successfully
 */
router.patch("/:id", authenticate, validate(updateUserSchema, "body"), updateUserProfile);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: delete user profile api 
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: account deleted
 */
router.delete("/:id",authenticate, deleteUserProfile);


export default router