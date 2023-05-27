import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient()
export const authOptions:AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      }, 
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) {
          throw new Error("invalid credentials");
        };
        const user = await prisma.user.findUnique({
          where: {
            email:credentials.email
          }
        })
        if(!user || !user.hashedPassword) {
          throw new Error("invalid credentials");
        }
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
        if(!isCorrectPassword) {
          throw new Error("invalid credentials");
        }
        return user
    })
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma)
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}