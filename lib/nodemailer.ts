import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const SMTP_SERVER_HOST = process.env.SMTP_HOST || ''
const SMTP_SERVER_USERNAME = process.env.SMTP_EMAIL_USERNAME || ''
const SMTP_SERVER_PASSWORD = process.env.SMTP_PASSWORD || ''
const SMTP_SERVER_PORT = Number(process.env.SMTP_PORT || '')

export const transporter = nodemailer.createTransport(
    new SMTPTransport({
        host: SMTP_SERVER_HOST,
        port: SMTP_SERVER_PORT,
        // secure: false, // true for port 465, false for other ports
        auth: {
            user: SMTP_SERVER_USERNAME, // Adresse email enregistrée dans Brevo
            pass: SMTP_SERVER_PASSWORD, // Clé API générée
        },
    }),
)
