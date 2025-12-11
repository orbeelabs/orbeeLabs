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
  Phone, 
  Building,
  Calendar,
  Eye,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  message: string;
  source?: string;
  status: string;
  createdAt: string;
}

export default function ContactsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchContacts();
    }
  }, [session]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
      }
    } catch (error) {
      ClientLogger.error('Erro ao buscar contatos', undefined, error as Error);
      toast.error('Erro ao carregar contatos');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-500';
      case 'CONTACTED': return 'bg-yellow-500';
      case 'QUALIFIED': return 'bg-green-500';
      case 'CONVERTED': return 'bg-purple-500';
      case 'LOST': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'NEW': return 'Novo';
      case 'CONTACTED': return 'Contatado';
      case 'QUALIFIED': return 'Qualificado';
      case 'CONVERTED': return 'Convertido';
      case 'LOST': return 'Perdido';
      default: return status;
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportContacts = () => {
    const csvContent = [
      ['Nome', 'Email', 'Telefone', 'Empresa', 'Website', 'Status', 'Data'],
      ...filteredContacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone || '',
        contact.company || '',
        contact.website || '',
        getStatusLabel(contact.status),
        new Date(contact.createdAt).toLocaleDateString('pt-BR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `contatos-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const viewContactDetails = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleDeleteContact = async (contact: Contact) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/admin/contacts?id=${contact.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Contato excluído com sucesso');
        // Remover o contato da lista local
        setContacts(prev => prev.filter(c => c.id !== contact.id));
        setContactToDelete(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Erro ao excluir contato');
      }
    } catch (error) {
      ClientLogger.error('Erro ao excluir contato', undefined, error as Error);
      toast.error('Erro ao excluir contato');
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDelete = (contact: Contact) => {
    setContactToDelete(contact);
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
                  Gerenciar <span className="text-gradient">Contatos</span>
                </h1>
                <p className="text-gray-300">
                  {filteredContacts.length} contato(s) encontrado(s)
                </p>
              </div>
            </div>
            <Button
              onClick={exportContacts}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar CSV</span>
            </Button>
          </div>

          {/* Filters */}
          <Card className="glass p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por nome, email ou empresa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                  <option value="NEW">Novo</option>
                  <option value="CONTACTED">Contatado</option>
                  <option value="QUALIFIED">Qualificado</option>
                  <option value="CONVERTED">Convertido</option>
                  <option value="LOST">Perdido</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Contacts List */}
          <div className="space-y-4">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="glass p-6 hover:glass-hover transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-white">
                          {contact.name}
                        </h3>
                        <Badge className={`${getStatusColor(contact.status)} text-white`}>
                          {getStatusLabel(contact.status)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{contact.email}</span>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{contact.phone}</span>
                          </div>
                        )}
                        {contact.company && (
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Building className="w-4 h-4" />
                            <span className="text-sm">{contact.company}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {contact.message}
                        </p>
                      </div>

                      {contact.website && (
                        <div className="mt-3">
                          <a
                            href={contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-yellow-400 text-sm"
                          >
                            {contact.website}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewContactDetails(contact)}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => confirmDelete(contact)}
                        className="flex items-center space-x-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Excluir</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <Card className="glass p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Mail className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum contato encontrado</h3>
                <p>Não há contatos que correspondam aos filtros selecionados.</p>
              </div>
            </Card>
          )}
        </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Detalhes do Contato</h2>
              <Button
                variant="outline"
                onClick={() => setSelectedContact(null)}
              >
                Fechar
              </Button>
            </div>

            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-2xl">
                    {selectedContact.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedContact.name}</h3>
                  <Badge className={`${getStatusColor(selectedContact.status)} text-white`}>
                    {getStatusLabel(selectedContact.status)}
                  </Badge>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>Email</span>
                  </h4>
                  <p className="text-gray-300">{selectedContact.email}</p>
                </Card>

                {selectedContact.phone && (
                  <Card className="glass p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>Telefone</span>
                    </h4>
                    <p className="text-gray-300">{selectedContact.phone}</p>
                  </Card>
                )}

                {selectedContact.company && (
                  <Card className="glass p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                      <Building className="w-5 h-5 text-primary" />
                      <span>Empresa</span>
                    </h4>
                    <p className="text-gray-300">{selectedContact.company}</p>
                  </Card>
                )}

                <Card className="glass p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Data de Contato</span>
                  </h4>
                  <p className="text-gray-300">
                    {new Date(selectedContact.createdAt).toLocaleString('pt-BR')}
                  </p>
                </Card>
              </div>

              {/* Message */}
              <Card className="glass p-4">
                <h4 className="font-semibold text-white mb-3">Mensagem</h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </Card>

              {/* Website */}
              {selectedContact.website && (
                <Card className="glass p-4">
                  <h4 className="font-semibold text-white mb-3">Website</h4>
                  <a
                    href={selectedContact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-yellow-400 text-lg break-all"
                  >
                    {selectedContact.website}
                  </a>
                </Card>
              )}

              {/* Source */}
              {selectedContact.source && (
                <Card className="glass p-4">
                  <h4 className="font-semibold text-white mb-3">Origem</h4>
                  <p className="text-gray-300">{selectedContact.source}</p>
                </Card>
              )}

              {/* Actions */}
              <div className="flex space-x-4 pt-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground"
                  onClick={() => {
                    window.open(`mailto:${selectedContact.email}`, '_blank');
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Email
                </Button>
                {selectedContact.phone && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      window.open(`tel:${selectedContact.phone}`, '_blank');
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {contactToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                Confirmar Exclusão
              </h2>
              
              <p className="text-gray-300 mb-6">
                Tem certeza que deseja excluir o contato de{' '}
                <span className="font-semibold text-white">
                  {contactToDelete.name}
                </span>?
                <br />
                <span className="text-sm text-gray-400">
                  Esta ação não pode ser desfeita.
                </span>
              </p>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setContactToDelete(null)}
                  className="flex-1"
                  disabled={isDeleting}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => handleDeleteContact(contactToDelete)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </PageLayout>
  );
}
