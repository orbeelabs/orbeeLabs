'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Users, Mail, Search, BarChart3 } from 'lucide-react';

interface DashboardStats {
  contacts: number;
  subscribers: number;
  audits: number;
  roiCalculations: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    contacts: 0,
    subscribers: 0,
    audits: 0,
    roiCalculations: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Chamar todas as APIs em paralelo para melhor performance
      const [contactsRes, newsletterRes, auditsRes, roiRes] = await Promise.all([
        fetch('/api/admin/contacts/count'),
        fetch('/api/admin/newsletter/count'),
        fetch('/api/admin/audits/count'),
        fetch('/api/admin/roi/count'),
      ]);

      // Verificar se todas as respostas foram bem-sucedidas
      if (!contactsRes.ok || !newsletterRes.ok || !auditsRes.ok || !roiRes.ok) {
        throw new Error('Erro ao buscar estatísticas das APIs');
      }

      // Extrair os dados JSON de cada resposta
      const [contactsData, newsletterData, auditsData, roiData] = await Promise.all([
        contactsRes.json(),
        newsletterRes.json(),
        auditsRes.json(),
        roiRes.json(),
      ]);

      // Atualizar o estado com os dados reais
      setStats({
        contacts: contactsData.count || 0,
        subscribers: newsletterData.count || 0,
        audits: auditsData.count || 0,
        roiCalculations: roiData.count || 0,
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      setError('Não foi possível carregar as estatísticas. Tente recarregar a página.');
      // Em caso de erro, manter valores em 0 mas ainda renderizar o dashboard
      setStats({
        contacts: 0,
        subscribers: 0,
        audits: 0,
        roiCalculations: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <PageLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4 leading-tight tracking-tight">
                Dashboard <span className="text-gradient">Administrativo</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Bem-vindo, {session.user?.name}!
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
            >
              <p className="text-red-400 text-sm">{error}</p>
              <Button
                onClick={fetchStats}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Tentar Novamente
              </Button>
            </motion.div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm mb-2">Contatos</p>
                    <p className="text-3xl font-bold text-white leading-none">{stats.contacts}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm mb-2">Newsletter</p>
                    <p className="text-3xl font-bold text-white leading-none">{stats.subscribers}</p>
                  </div>
                  <Mail className="w-8 h-8 text-primary" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm mb-2">Auditorias SEO</p>
                    <p className="text-3xl font-bold text-white leading-none">{stats.audits}</p>
                  </div>
                  <Search className="w-8 h-8 text-primary" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm mb-2">Cálculos ROI</p>
                    <p className="text-3xl font-bold text-white leading-none">{stats.roiCalculations}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass p-6">
              <h2 className="text-xl font-bold text-white mb-6 leading-tight tracking-tight">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => router.push('/admin/contacts')}
                  className="flex items-center space-x-2 h-12"
                >
                  <Users className="w-5 h-5" />
                  <span>Gerenciar Contatos</span>
                </Button>
                <Button
                  onClick={() => router.push('/admin/newsletter')}
                  className="flex items-center space-x-2 h-12"
                >
                  <Mail className="w-5 h-5" />
                  <span>Gerenciar Newsletter</span>
                </Button>
                <Button
                  onClick={() => router.push('/admin/audits')}
                  className="flex items-center space-x-2 h-12"
                >
                  <Search className="w-5 h-5" />
                  <span>Ver Auditorias</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
    </PageLayout>
  );
}









