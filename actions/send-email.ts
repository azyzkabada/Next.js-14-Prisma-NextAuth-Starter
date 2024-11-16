'use server'

import { transporter } from '@/lib/nodemailer'

const SITE_MAIL_SENDER = process.env.SITE_EMAIL_SENDER || ''

export async function sendMail({
    sendTo,
    subject,
    text,
    html,
}: {
    sendTo?: string
    subject: string
    text: string
    html?: string
}) {
    try {
        // Vérifiez la connexion au serveur SMTP
        const isVerified = await transporter.verify()
        if (!isVerified) {
            console.error('SMTP server verification failed')
            return
        }

        // Envoi de l'email
        const info = await transporter.sendMail({
            from: SITE_MAIL_SENDER, // Adresse email configurée dans Brevo
            to: sendTo, // Destinataire
            subject: subject,
            text: text,
            html: html || '',
        })

        return info
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error)
    }
}
