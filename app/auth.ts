import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Resend from "next-auth/providers/resend"
import clientPromise from './db/client';

export const config = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Resend({
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async session({ session, user }) {
      session.user.userId = user.id;
      return session
    }
  }
} satisfies NextAuthConfig
 
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config)