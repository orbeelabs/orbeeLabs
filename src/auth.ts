import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { Logger, logAuthEvent } from "@/lib/logger";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          Logger.warn('Tentativa de login sem credenciais completas', {
            hasEmail: !!credentials?.email,
            hasPassword: !!credentials?.password,
          });
          return null;
        }

        const email = (credentials.email as string).trim().toLowerCase();
        
        Logger.debug('Tentativa de autenticação', {
          emailPrefix: email.substring(0, 3) + '***',
        });

        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        });

        if (!user) {
          Logger.warn('Tentativa de login com usuário inexistente', {
            emailPrefix: email.substring(0, 3) + '***',
          });
          return null;
        }

        Logger.debug('Usuário encontrado', {
          userId: user.id,
          role: user.role,
        });

        const isPasswordValid = await compare(credentials.password as string, user.password);

        if (!isPasswordValid) {
          Logger.warn('Tentativa de login com senha inválida', {
            userId: user.id,
          });
          return null;
        }

        logAuthEvent('Login bem-sucedido', user.id, {
          userId: user.id,
          role: user.role,
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Se a URL é relativa, usar baseUrl
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Se a URL é do mesmo domínio, usar ela
      else if (new URL(url).origin === baseUrl) return url;
      // Caso contrário, redirecionar para admin
      return `${baseUrl}/admin`;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});









