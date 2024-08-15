

// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/prisma';

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           throw new Error('Invalid email or password');
//         }
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });
//         if (!user || !user.hassPassword) {
//           throw new Error('Invalid email or password');
//         }
//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hassPassword
//         );
//         if (!isCorrectPassword) {
//           throw new Error('Invalid email or password');
//         }
//         return user;
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/login',
//     error: '/error', 
//   },
//   debug: process.env.NODE_ENV === 'development',
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);

import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid email or password');
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.hassPassword) {
          throw new Error('Invalid email or password');
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hassPassword
        );
        if (!isCorrectPassword) {
          throw new Error('Invalid email or password');
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/error',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
