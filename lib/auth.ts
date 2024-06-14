import NextAuth from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

import { db } from '@/database'

import { users, accounts, sessions, verificationTokens } from '@/database/schema'

export const { auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }) as Adapter,
  secret: process.env.NEXT_JWT_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/signin' },
  providers: []
})
