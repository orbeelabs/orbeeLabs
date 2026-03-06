'use client';

import { ClientLogger } from '@/lib/logger-client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Users,
  TrendingUp,
  TrendingDown,
  Phone,
  Mail,
  Building,
  Calendar,
  MessageSquare,
  PhoneCall,
  FileText,
  Handshake,
  Send,
  Trash2,
  X,
  GripVertical,
  BarChart3,
  Target,
  ArrowUpRight,
  Clock,
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

interface ContactNote {
  id: string;
  contactId: string;
  content: string;
  type: string;
  author: string;
  createdAt: string;
}

interface Stats {
  total: number;
  byStatus: Record<string, number>;
  conversionRate: number;
  qualificationRate: number;
  last7Days: number;
  last30Days: number;
  thisMonth: number;
  lastMonth: number;
  monthOverMonth: number;
}

const STATUSES = [
  { key: 'NEW', label: 'Novos', color: 'bg-blue-500', icon: Users },
  { key: 'CONTACTED', label: 'Contatados', color: 'bg-yellow-500', icon: PhoneCall },
  { key: 'QUALIFIED', label: 'Qualificados', color: 'bg-green-500', icon: Target },
  { key: 'CONVERTED', label: 'Convertidos', color: 'bg-purple-500', icon: Handshake },
  { key: 'LOST', label: 'Perdidos', color: 'bg-red-500', icon: X },
];

const NOTE_TYPES = [
  { key: 'NOTE', label: 'Nota', icon: MessageSquare },
  { key: 'CALL', label: 'Ligacao', icon: PhoneCall },
  { key: 'EMAIL', label: 'Email', icon: Send },
  { key: 'MEETING', label: 'Reuniao', icon: Users },
  { key: 'PROPOSAL', label: 'Proposta', icon: FileText },
];

type ViewMode = 'kanban' | 'dashboard';

export default function CRMPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [notes, setNotes] = useState<ContactNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState('NOTE');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/login');
    }
  }, [authStatus, router]);

  const fetchContacts = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/contacts?limit=200');
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || data.data || []);
      }
    } catch (error) {
      ClientLogger.error('Erro ao buscar contatos', undefined, error as Error);
      toast.error('Erro ao carregar contatos');
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/contacts/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      ClientLogger.error('Erro ao buscar stats', undefined, error as Error);
    }
  }, []);

  useEffect(() => {
    if (session) {
      Promise.all([fetchContacts(), fetchStats()]).finally(() => setIsLoading(false));
    }
  }, [session, fetchContacts, fetchStats]);

  const fetchNotes = async (contactId: string) => {
    setIsLoadingNotes(true);
    try {
      const response = await fetch(`/api/admin/contacts/notes?contactId=${contactId}`);
      if (response.ok) {
        const data = await response.json();
        setNotes(data.data?.notes || []);
      }
    } catch (error) {
      ClientLogger.error('Erro ao buscar notas', undefined, error as Error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  const updateStatus = async (contactId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: contactId, status: newStatus }),
      });

      if (response.ok) {
        setContacts(prev =>
          prev.map(c => c.id === contactId ? { ...c, status: newStatus } : c)
        );
        if (selectedContact?.id === contactId) {
          setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null);
        }
        fetchStats();
        toast.success(`Status atualizado para ${STATUSES.find(s => s.key === newStatus)?.label}`);
      } else {
        toast.error('Erro ao atualizar status');
      }
    } catch (error) {
      ClientLogger.error('Erro ao atualizar status', undefined, error as Error);
      toast.error('Erro ao atualizar status');
    }
  };

  const addNote = async () => {
    if (!selectedContact || !newNote.trim()) return;
    setIsSavingNote(true);
    try {
      const response = await fetch('/api/admin/contacts/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactId: selectedContact.id,
          content: newNote,
          type: noteType,
          author: session?.user?.name || 'Admin',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setNotes(prev => [data.data, ...prev]);
        setNewNote('');
        toast.success('Nota adicionada');
      }
    } catch (error) {
      ClientLogger.error('Erro ao adicionar nota', undefined, error as Error);
      toast.error('Erro ao adicionar nota');
    } finally {
      setIsSavingNote(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/notes?id=${noteId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotes(prev => prev.filter(n => n.id !== noteId));
        toast.success('Nota excluida');
      }
    } catch (error) {
      ClientLogger.error('Erro ao excluir nota', undefined, error as Error);
    }
  };

  const openContact = (contact: Contact) => {
    setSelectedContact(contact);
    fetchNotes(contact.id);
  };

  const getContactsByStatus = (status: string) =>
    contacts.filter(c => c.status === status);

  const getNoteTypeIcon = (type: string) => {
    const found = NOTE_TYPES.find(t => t.key === type);
    return found ? found.icon : MessageSquare;
  };

  const getNoteTypeLabel = (type: string) => {
    const found = NOTE_TYPES.find(t => t.key === type);
    return found ? found.label : type;
  };

  if (authStatus === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Carregando CRM...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <PageLayout>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
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
                CRM <span className="text-gradient">Pipeline</span>
              </h1>
              <p className="text-gray-300">
                {contacts.length} lead(s) no funil
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              onClick={() => setViewMode('kanban')}
              size="sm"
            >
              <GripVertical className="w-4 h-4 mr-1" />
              Pipeline
            </Button>
            <Button
              variant={viewMode === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setViewMode('dashboard')}
              size="sm"
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Dashboard
            </Button>
          </div>
        </div>

        {viewMode === 'dashboard' && stats && <DashboardView stats={stats} />}
        {viewMode === 'kanban' && (
          <KanbanView
            statuses={STATUSES}
            getContactsByStatus={getContactsByStatus}
            onOpenContact={openContact}
            onUpdateStatus={updateStatus}
          />
        )}
      </div>

      {/* Contact Detail Drawer */}
      <AnimatePresence>
        {selectedContact && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedContact(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-card border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">
                        {selectedContact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{selectedContact.name}</h2>
                      {selectedContact.company && (
                        <p className="text-gray-400 text-sm">{selectedContact.company}</p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedContact(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Status Selector */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Status do Lead</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map(s => (
                      <button
                        key={s.key}
                        onClick={() => updateStatus(selectedContact.id, s.key)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedContact.status === s.key
                            ? `${s.color} text-white`
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Mail className="w-4 h-4 text-primary" />
                    <a href={`mailto:${selectedContact.email}`} className="hover:text-primary text-sm">
                      {selectedContact.email}
                    </a>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Phone className="w-4 h-4 text-primary" />
                      <a href={`tel:${selectedContact.phone}`} className="hover:text-primary text-sm">
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}
                  {selectedContact.company && (
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Building className="w-4 h-4 text-primary" />
                      <span className="text-sm">{selectedContact.company}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      {new Date(selectedContact.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Mensagem original</p>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-300 text-sm leading-relaxed">{selectedContact.message}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 mb-6">
                  <Button
                    size="sm"
                    onClick={() => window.open(`mailto:${selectedContact.email}`, '_blank')}
                    className="flex-1"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                  {selectedContact.phone && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`https://wa.me/${selectedContact.phone?.replace(/\D/g, '')}`, '_blank')}
                      className="flex-1"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                  )}
                </div>

                {/* Add Note */}
                <div className="border-t border-white/10 pt-6 mb-4">
                  <p className="text-sm font-semibold text-white mb-3">Adicionar Nota</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {NOTE_TYPES.map(t => (
                      <button
                        key={t.key}
                        onClick={() => setNoteType(t.key)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs transition-all ${
                          noteType === t.key
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        <t.icon className="w-3 h-3" />
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Escreva uma nota..."
                      onKeyDown={(e) => e.key === 'Enter' && addNote()}
                      className="flex-1"
                    />
                    <Button onClick={addNote} disabled={isSavingNote || !newNote.trim()} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Notes History */}
                <div>
                  <p className="text-sm font-semibold text-white mb-3">
                    Historico ({notes.length})
                  </p>
                  {isLoadingNotes ? (
                    <div className="text-center py-4">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                  ) : notes.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">
                      Nenhuma interacao registrada ainda.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {notes.map(note => {
                        const NoteIcon = getNoteTypeIcon(note.type);
                        return (
                          <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 rounded-lg p-3 group"
                          >
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex items-center space-x-2">
                                <NoteIcon className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs text-primary font-medium">
                                  {getNoteTypeLabel(note.type)}
                                </span>
                                <span className="text-xs text-gray-500">por {note.author}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">
                                  {new Date(note.createdAt).toLocaleDateString('pt-BR')}{' '}
                                  {new Date(note.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <button
                                  onClick={() => deleteNote(note.id)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="w-3 h-3 text-red-400 hover:text-red-300" />
                                </button>
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm">{note.content}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}

// --- Kanban View ---
function KanbanView({
  statuses,
  getContactsByStatus,
  onOpenContact,
  onUpdateStatus,
}: {
  statuses: typeof STATUSES;
  getContactsByStatus: (status: string) => Contact[];
  onOpenContact: (contact: Contact) => void;
  onUpdateStatus: (id: string, status: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 min-h-[60vh]">
      {statuses.map(status => {
        const contactsInStatus = getContactsByStatus(status.key);
        const StatusIcon = status.icon;
        return (
          <div key={status.key} className="flex flex-col">
            {/* Column Header */}
            <div className={`${status.color} rounded-t-lg px-4 py-3 flex items-center justify-between`}>
              <div className="flex items-center space-x-2">
                <StatusIcon className="w-4 h-4 text-white" />
                <span className="font-semibold text-white text-sm">{status.label}</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                {contactsInStatus.length}
              </Badge>
            </div>

            {/* Column Body */}
            <div className="flex-1 bg-white/5 rounded-b-lg p-2 space-y-2 min-h-[200px]">
              {contactsInStatus.map(contact => (
                <motion.div
                  key={contact.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-white/10 rounded-lg p-3 cursor-pointer hover:border-primary/50 transition-all group"
                  onClick={() => onOpenContact(contact)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground font-bold text-xs">
                          {contact.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">{contact.name}</p>
                        {contact.company && (
                          <p className="text-gray-400 text-xs truncate">{contact.company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2 mb-2">{contact.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    {/* Quick status change buttons */}
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-0.5 transition-opacity">
                      {statuses
                        .filter(s => s.key !== contact.status)
                        .slice(0, 2)
                        .map(s => (
                          <button
                            key={s.key}
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateStatus(contact.id, s.key);
                            }}
                            className={`w-5 h-5 rounded-full ${s.color} flex items-center justify-center`}
                            title={`Mover para ${s.label}`}
                          >
                            <ArrowUpRight className="w-3 h-3 text-white" />
                          </button>
                        ))}
                    </div>
                  </div>
                </motion.div>
              ))}
              {contactsInStatus.length === 0 && (
                <div className="flex items-center justify-center h-24 text-gray-500 text-xs">
                  Nenhum lead
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Dashboard View ---
function DashboardView({ stats }: { stats: Stats }) {
  const funnelData = [
    { label: 'Novos', value: stats.byStatus.NEW || 0, color: 'bg-blue-500' },
    { label: 'Contatados', value: stats.byStatus.CONTACTED || 0, color: 'bg-yellow-500' },
    { label: 'Qualificados', value: stats.byStatus.QUALIFIED || 0, color: 'bg-green-500' },
    { label: 'Convertidos', value: stats.byStatus.CONVERTED || 0, color: 'bg-purple-500' },
    { label: 'Perdidos', value: stats.byStatus.LOST || 0, color: 'bg-red-500' },
  ];

  const maxValue = Math.max(...funnelData.map(d => d.value), 1);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-xs">Total de Leads</p>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <div className="flex items-center mt-1">
            {stats.monthOverMonth >= 0 ? (
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
            )}
            <span className={`text-xs ${stats.monthOverMonth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.monthOverMonth >= 0 ? '+' : ''}{stats.monthOverMonth}% vs mes anterior
            </span>
          </div>
        </Card>

        <Card className="glass p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-xs">Taxa de Conversao</p>
            <Target className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.conversionRate}%</p>
          <p className="text-xs text-gray-400 mt-1">
            {stats.byStatus.CONVERTED || 0} convertidos de {stats.total}
          </p>
        </Card>

        <Card className="glass p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-xs">Ultimos 7 dias</p>
            <Calendar className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.last7Days}</p>
          <p className="text-xs text-gray-400 mt-1">novos leads</p>
        </Card>

        <Card className="glass p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-xs">Este Mes</p>
            <BarChart3 className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.thisMonth}</p>
          <p className="text-xs text-gray-400 mt-1">
            vs {stats.lastMonth} no mes anterior
          </p>
        </Card>
      </div>

      {/* Funnel */}
      <Card className="glass p-6">
        <h2 className="text-lg font-bold text-white mb-6">Funil de Conversao</h2>
        <div className="space-y-4">
          {funnelData.map((item, index) => (
            <div key={item.label} className="flex items-center space-x-4">
              <div className="w-28 text-right">
                <span className="text-sm text-gray-300">{item.label}</span>
              </div>
              <div className="flex-1 relative">
                <div className="h-10 bg-white/5 rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / maxValue) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`h-full ${item.color} rounded-lg flex items-center justify-end px-3`}
                  >
                    {item.value > 0 && (
                      <span className="text-white font-bold text-sm">{item.value}</span>
                    )}
                  </motion.div>
                </div>
              </div>
              <div className="w-16 text-right">
                <span className="text-sm text-gray-400">
                  {stats.total > 0 ? ((item.value / stats.total) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Conversion Rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Taxa de Qualificacao</h3>
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-green-500"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${stats.qualificationRate}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{stats.qualificationRate}%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-300 text-sm">
                {(stats.byStatus.QUALIFIED || 0) + (stats.byStatus.CONVERTED || 0)} leads qualificados ou convertidos
              </p>
              <p className="text-gray-500 text-xs mt-1">de {stats.total} total</p>
            </div>
          </div>
        </Card>

        <Card className="glass p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Taxa de Conversao</h3>
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-purple-500"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${stats.conversionRate}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{stats.conversionRate}%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-300 text-sm">
                {stats.byStatus.CONVERTED || 0} leads convertidos em clientes
              </p>
              <p className="text-gray-500 text-xs mt-1">de {stats.total} total</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
