'use client';

import { ClientLogger } from '@/lib/logger-client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Mail, 
  Calendar,
  Users,
  UserCheck,
  UserX,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  source?: string;
  status: string;
  createdAt: string;
}

export default function NewsletterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchSubscribers();
    }
  }, [session]);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/newsletter');
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (error) {
      ClientLogger.error('Erro ao buscar assinantes', undefined, error as Error);
      toast.error('Erro ao carregar assinantes');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500';
      case 'UNSUBSCRIBED': return 'bg-red-500';
      case 'BOUNCED': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Ativo';
      case 'UNSUBSCRIBED': return 'Desinscrito';
      case 'BOUNCED': return 'Bounce';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <UserCheck className="w-4 h-4" />;
      case 'UNSUBSCRIBED': return <UserX className="w-4 h-4" />;
      case 'BOUNCED': return <Mail className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportSubscribers = () => {
    const csvContent = [
      ['Email', 'Nome', 'Status', 'Fonte', 'Data de Inscrição'],
      ...filteredSubscribers.map(subscriber => [
        subscriber.email,
        subscriber.name || '',
        getStatusLabel(subscriber.status),
        subscriber.source || '',
        new Date(subscriber.createdAt).toLocaleDateString('pt-BR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getStats = () => {
    const active = subscribers.filter(s => s.status === 'ACTIVE').length;
    const unsubscribed = subscribers.filter(s => s.status === 'UNSUBSCRIBED').length;
    const bounced = subscribers.filter(s => s.status === 'BOUNCED').length;
    return { active, unsubscribed, bounced, total: subscribers.length };
  };

  const stats = getStats();

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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push('/admin')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Gerenciar <span className="text-gradient">Newsletter</span>
                </h1>
                <p className="text-gray-300">
                  {filteredSubscribers.length} assinante(s) encontrado(s)
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Email</span>
              </Button>
              <Button
                onClick={exportSubscribers}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Exportar CSV</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total</p>
                    <p className="text-3xl font-bold text-white">{stats.total}</p>
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
                    <p className="text-gray-300 text-sm">Ativos</p>
                    <p className="text-3xl font-bold text-green-400">{stats.active}</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-400" />
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
                    <p className="text-gray-300 text-sm">Desinscritos</p>
                    <p className="text-3xl font-bold text-red-400">{stats.unsubscribed}</p>
                  </div>
                  <UserX className="w-8 h-8 text-red-400" />
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
                    <p className="text-gray-300 text-sm">Bounces</p>
                    <p className="text-3xl font-bold text-yellow-400">{stats.bounced}</p>
                  </div>
                  <Mail className="w-8 h-8 text-yellow-400" />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <Card className="glass p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search-newsletter"
                    name="search-newsletter"
                    placeholder="Buscar por email ou nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Todos os status</option>
                  <option value="ACTIVE">Ativo</option>
                  <option value="UNSUBSCRIBED">Desinscrito</option>
                  <option value="BOUNCED">Bounce</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Subscribers List */}
          <div className="space-y-4">
            {filteredSubscribers.map((subscriber, index) => (
              <motion.div
                key={subscriber.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="glass p-6 hover:glass-hover transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-lg font-semibold text-white">
                            {subscriber.email}
                          </h3>
                          <Badge className={`${getStatusColor(subscriber.status)} text-white flex items-center space-x-1`}>
                            {getStatusIcon(subscriber.status)}
                            <span>{getStatusLabel(subscriber.status)}</span>
                          </Badge>
                        </div>
                        {subscriber.name && (
                          <p className="text-gray-300 text-sm">{subscriber.name}</p>
                        )}
                        <div className="flex items-center space-x-4 text-gray-400 text-sm mt-2">
                          {subscriber.source && (
                            <span>Fonte: {subscriber.source}</span>
                          )}
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(subscriber.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-primary hover:text-yellow-400"
                      >
                        Enviar Email
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredSubscribers.length === 0 && (
            <Card className="glass p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Mail className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum assinante encontrado</h3>
                <p>Não há assinantes que correspondam aos filtros selecionados.</p>
              </div>
            </Card>
          )}
        </div>
    </PageLayout>
  );
}










