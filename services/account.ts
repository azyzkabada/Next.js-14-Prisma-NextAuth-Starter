// Services for OAuth providers such as Google, Github, etc...
import { prisma } from '@/lib/prisma'

export const getAccountByUserId = async (userId: string) => {
    try {
        const account = await prisma.account.findFirst({
            where: { userId },
        })

        return account
    } catch (e) {
        console.error(e)
        return null
    }
}
