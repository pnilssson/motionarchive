import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/nodemailer"
// Remove usage of this once type issue fixed
import type { Adapter } from "next-auth/adapters";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodbclient"

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    providers: [
        EmailProvider({
          server: process.env.EMAIL_SERVER,
          from: process.env.EMAIL_FROM
        }),
      ],
})

export { handler as GET, handler as POST }