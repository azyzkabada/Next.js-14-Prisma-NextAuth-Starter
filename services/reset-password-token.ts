import { prisma } from '@/lib/prisma'
import { setTokenExpiration } from '@/lib/utils'
import { v4 as uuid } from 'uuid'

export const generateResetPasswordToken = async (email: string) => {
    const existingToken = await getResetPasswordTokenByEmail(email)
    if (existingToken) {
        await deleteResetPasswordTokenById(existingToken.id)
    }

    const token = uuid()
    const expires = setTokenExpiration()

    const resetPasswordToken = await prisma.resetPasswordToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return resetPasswordToken
}

export const getResetPasswordToken = async (token: string) => {
    try {
        const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
            where: { token },
        })

        return resetPasswordToken
    } catch {
        return null
    }
}

export const getResetPasswordTokenByEmail = async (email: string) => {
    try {
        const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
            where: { email },
        })

        return resetPasswordToken
    } catch {
        return null
    }
}

export const deleteResetPasswordTokenById = async (id: string) => {
    try {
        return await prisma.resetPasswordToken.delete({
            where: { id },
        })
    } catch {
        return null
    }
}
