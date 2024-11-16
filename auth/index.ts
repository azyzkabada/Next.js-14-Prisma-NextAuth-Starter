import { authConfig } from '@/auth/config'
import { prisma } from '@/lib/prisma'
import { isExpired } from '@/lib/utils'
import { getAccountByUserId } from '@/services/account'
import { getTwoFactorConfirmationByUserId } from '@/services/two-factor-confirmation'
import { getUserById, updateUserById } from '@/services/user'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    unstable_update,
    //   update
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 1, // 1 Day
    },
    pages: {
        signIn: '/login',
        error: '/error',
    },
    events: {
        async linkAccount({ user }) {
            await updateUserById(user.id as string, {
                emailVerified: new Date(),
            })
        },
    },
    callbacks: {
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token

            const existingAccount = await getAccountByUserId(existingUser.id)

            token.name = existingUser.name
            token.email = existingUser.email
            token.role = existingUser.role
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            token.isOAuth = !!existingAccount

            return token
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role
            }

            if (session.user) {
                session.user.name = token.name
                session.user.email = token.email as string
                session.user.isTwoFactorEnabled =
                    token.isTwoFactorEnabled as boolean
                session.user.isOAuth = token.isOAuth as boolean
            }

            return session
        },
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') return true

            const existingUser = await getUserById(user.id as string)
            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false

            // If user's 2FA checked
            if (existingUser.isTwoFactorEnabled) {
                const existingTwoFactorConfirmation =
                    await getTwoFactorConfirmationByUserId(existingUser.id)
                // If two factor confirmation doesn't exist, then prevent to login
                if (!existingTwoFactorConfirmation) return false
                // If two factor confirmation is expired, then prevent to login
                const hasExpired = isExpired(
                    existingTwoFactorConfirmation.expires,
                )
                if (hasExpired) return false
            }

            return true
        },
    },
    ...authConfig,
})
