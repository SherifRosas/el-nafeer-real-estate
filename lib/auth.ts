import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from './supabase'
import crypto from 'crypto'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const mainAdminEmail = 'sherifrosas.ai@gmail.com'
        const mainAdminPassword = '777930#Sh'

        if (credentials.email === mainAdminEmail && credentials.password === mainAdminPassword) {
          return {
            id: 'main-admin',
            email: mainAdminEmail,
            name: 'Main Platform Admin',
            role: 'main-admin',
          } as any
        }

        try {
          const user = await db.getUserByEmail(credentials.email)
          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name || 'User',
              role: 'user',
            } as any
          }
        } catch (error) {
          console.error('Auth Check Error:', error)
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'sovereign-secret-fallback-2026',
}
