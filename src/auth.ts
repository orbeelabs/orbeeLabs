import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

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
          console.log('❌ Credenciais faltando:', { hasEmail: !!credentials?.email, hasPassword: !!credentials?.password });
          return null;
        }

        const email = (credentials.email as string).trim().toLowerCase();
        // Log apenas em desenvolvimento - não expor email em logs de produção
        if (process.env.NODE_ENV === 'development') {
          console.log('🔐 Tentando autenticar:', { email: email.substring(0, 3) + '***' });
        }

        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        });

        if (!user) {
          // Não logar email em produção por segurança
          if (process.env.NODE_ENV === 'development') {
            console.log('❌ Usuário não encontrado');
          }
          return null;
        }

        // Log apenas em desenvolvimento - não expor email em logs de produção
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Usuário encontrado:', { id: user.id, role: user.role });
        }

        const isPasswordValid = await compare(credentials.password as string, user.password);

        if (!isPasswordValid) {
          // Não logar email em produção por segurança
          if (process.env.NODE_ENV === 'development') {
            console.log('❌ Senha inválida');
          }
          return null;
        }

        // Log apenas em desenvolvimento - não expor email em produção
        if (process.env.NODE_ENV === 'development') {
          console.log('✅✅✅ Autenticação bem-sucedida');
        }

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









