import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usernameOrEmail: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.usernameOrEmail || !credentials?.password) return null;
        
        // Try to find user by username or email
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.usernameOrEmail },
              { username: credentials.usernameOrEmail }
            ]
          }
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        };
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Get or create username from email
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });

        if (existingUser) {
          // Use existing username
          user.name = existingUser.username;
        } else {
          // Create a new username from email
          const baseUsername = user.email!.split('@')[0];
          let username = baseUsername;
          let counter = 1;

          // Keep trying until we find an available username
          while (true) {
            const exists = await prisma.user.findUnique({
              where: { username }
            });
            if (!exists) break;
            username = `${baseUsername}${counter}`;
            counter++;
          }

          // Update user with username
          await prisma.user.update({
            where: { email: user.email! },
            data: { username }
          });
          user.name = username;
        }
      }
      return true;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.sub) {
        session.user.id = token.sub;
        // Fetch the latest user data from the database
        const user = await prisma.user.findUnique({
          where: { id: token.sub }
        });
        if (user) {
          session.user.name = user.username;
          session.user.email = user.email;
        }
      }
      return session;
    },
    async jwt({ token, user, account }: { token: any; user: any; account: any }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 