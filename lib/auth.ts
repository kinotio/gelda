import NextAuth from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

import { db } from '@/lib/drizzle'

import { users, accounts, sessions, verificationTokens } from '@/database/schema'

export const { handlers, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }) as Adapter,
  providers: []
})
