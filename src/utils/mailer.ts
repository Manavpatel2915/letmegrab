import nodemailer from "nodemailer";
import { env } from "../config/env.config.js";

const transporter = nodemailer.createTransport({
    host: env.MAIL.HOST,
    port: env.MAIL.PORT,
    secure: false, 
    auth: {
        user: env.MAIL.USER,
        pass: env.MAIL.PASS
    }
});

export const sendMail = async (to: string, subject: string, text: string) => {
    try {
        const info = await transporter.sendMail({
            from: env.MAIL.USER,
            to: to,
            subject: subject,
            text: text
        });
        console.log("mail sent", info.messageId);
    } catch (error) {
        console.log("mail error accour", error);
    }
}
