'use server'

import { transporter } from '@/lib/nodemailer'

const SITE_MAIL_SENDER = process.env.SITE_EMAIL_SENDER || ''

async function sendMail({
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
            html: html || `<p>${text}</p>`,
        })

        // console.log('NodeMailer Info Response :', info)

        return info
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error)
    }
}
export const sendVerificationEmail = async (email: string, token: string) => {
    const verifyEmailLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`

    await sendMail({
        sendTo: email as string,
        text: 'Action required: Verify your email',
        subject: '[Next Dashboard] Action required: Verify your email',
        html: `<p>Click <a href="${verifyEmailLink}">Here</a> to verify your email.</p>`,
    })
}

export const sendResetPasswordEmail = async (email: string, token: string) => {
    const resetPasswordLink = `${process.env.NEXT_PUBLIC_APP_URL}/new-password?token=${token}`
    await sendMail({
        sendTo: email as string,
        text: 'Action required: Verify your email',
        subject: '[Next Dashboard] Action required: Verify your email',
        html: `<p>Click <a href="${resetPasswordLink}">Here</a> to reset your password.</p>`,
    })
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
    await sendMail({
        sendTo: email as string,
        text: 'Action required: Verify your email',
        subject:
            '[Next Dashboard] Action required: Confirm Two-Factor Authentication',
        html: `<p>${token} is your authentication Code.</p>`,
    })
}
