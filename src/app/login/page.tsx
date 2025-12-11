'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { ClientLogger } from '@/lib/logger-client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageLayout } from '@/components/layout';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Credenciais inválidas');
        setIsLoading(false);
      } else if (result?.ok) {
        toast.success('Login realizado com sucesso!');
        // Aguardar mais tempo para garantir que a sessão foi criada e o cookie foi definido
        // Em produção, pode precisar de mais tempo
        setTimeout(() => {
          // Forçar reload completo para garantir que a sessão seja lida
          window.location.href = '/admin';
        }, 1000);
      } else {
        toast.error('Erro inesperado no login');
        setIsLoading(false);
      }
    } catch (error) {
      ClientLogger.error('Erro no login', undefined, error as Error);
      toast.error('Erro ao fazer login');
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
        <div className="max-w-md mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold text-2xl">OL</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Acesso <span className="text-gradient">Administrativo</span>
              </h1>
              <p className="text-gray-300">
                Faça login para acessar o painel administrativo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-400"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">
                  Senha
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Entre em contato para obter acesso administrativo
              </p>
              <p className="text-gray-300 text-sm mt-1">
                Email: <span className="text-primary">contato@orbeelabs.com</span>
              </p>
            </div>
          </motion.div>
        </div>
    </PageLayout>
  );
}
