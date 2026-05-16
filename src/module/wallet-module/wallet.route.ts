import { Router } from "express";
import { authenticate } from "../../middleware/auth-middleware.js";
import { validate } from "../../middleware/validate-middleware.js";
import { getCachedData } from "../../middleware/redis-middleware.js";
import { getBalance, deposit, withdraw } from "./wallet.controller.js";
import { amountSchema } from "./wallet.validation.js";

const router = Router();

/**
 * @swagger
 * /wallet/:
 *   get:
 *     summary: get wallet balance api
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance
 */
router.get("/", authenticate, getCachedData, getBalance);
/**
 * @swagger
 * /wallet/deposit:
 *   post:
 *     summary: deposit api
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Deposit successful
 */
router.post("/deposit", authenticate, validate(amountSchema, "body"), deposit);
/**
 * @swagger
 * /wallet/withdraw:
 *   post:
 *     summary: withdraw api
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Withdrawal successful
 */
router.post("/withdraw", authenticate, validate(amountSchema, "body"), withdraw);

export default router;
