import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import Token from "next-auth"
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_KEY || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }): Promise<boolean> {
      const existingUser  = await prisma.user.findUnique({
        where: { email: user.email as string },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email ||"",
            image: user.image,
          },
        });
      }

      return true;
    },
    async jwt({ token, account }): Promise<any> {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({
        session,
        token,
        user,
      }: {
        session: Session;
        token: any;
        user?: any;
      }): Promise<Session> {
        // Ensure session.user is not undefined
        if (session.user) {
          const email = session.user.email as string | undefined;
  
          if (email) {
            const dbUser = await prisma.user.findUnique({
              where: { email },
            });
  
            if (dbUser) {
              session.user.id = dbUser.id;
              session.user.name = dbUser.name;
              session.user.email = dbUser.email;
              session.user.image = dbUser.image;
            }
          }
        }
  
        return session;
      },
  },
  pages: {
    signIn: '/signin',
    
    error: '/error',
  },
};
