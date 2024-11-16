import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/schemas'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } })

        return user
    } catch {
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } })

        return user
    } catch {
        return null
    }
}

export const createUser = async (payload: z.infer<typeof registerSchema>) => {
    try {
        return await prisma.user.create({
            data: payload,
        })
    } catch {
        return null
    }
}

type UpdateUserType = Prisma.Args<typeof prisma.user, 'update'>['data']
export const updateUserById = async (id: string, payload: UpdateUserType) => {
    try {
        return await prisma.user.update({
            where: { id },
            data: payload,
        })
    } catch {
        return null
    }
}
