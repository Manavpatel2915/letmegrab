
import authRoutes from "../module/auth-module/auth.route.js" 
import type { Express } from "express";
import userRoutes from "../module/User-module/user.route.js"
import walletRoutes from "../module/wallet-module/wallet.route.js"

export default function(app:Express) {
    app.use("/auth", authRoutes);
    app.use("/user",userRoutes);
    app.use("/wallet", walletRoutes);
}