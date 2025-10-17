'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
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
      const [contactsRes, subscribersRes, auditsRes, roiRes] = await Promise.all([
        fetch('/api/admin/contacts/count'),
        fetch('/api/admin/newsletter/count'),
        fetch('/api/admin/audits/count'),
        fetch('/api/admin/roi/count'),
      ]);

      const [contacts, subscribers, audits, roi] = await Promise.all([
        contactsRes.json(),
        subscribersRes.json(),
        roiRes.json(),
        auditsRes.json(),
      ]);

      setStats({
        contacts: contacts.count || 0,
        subscribers: subscribers.count || 0,
        audits: audits.count || 0,
        roiCalculations: roi.count || 0,
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
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
    <>
      <Navigation />
      <div className="min-h-screen bg-background text-foreground pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Dashboard <span className="text-gradient">Administrativo</span>
              </h1>
              <p className="text-gray-300">
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Contatos</p>
                    <p className="text-3xl font-bold text-white">{stats.contacts}</p>
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
                    <p className="text-gray-300 text-sm">Newsletter</p>
                    <p className="text-3xl font-bold text-white">{stats.subscribers}</p>
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
                    <p className="text-gray-300 text-sm">Auditorias SEO</p>
                    <p className="text-3xl font-bold text-white">{stats.audits}</p>
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
                    <p className="text-gray-300 text-sm">Cálculos ROI</p>
                    <p className="text-3xl font-bold text-white">{stats.roiCalculations}</p>
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
              <h2 className="text-xl font-bold text-white mb-4">Ações Rápidas</h2>
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
      </div>
      <Footer />
    </>
  );
}








