'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Mail, User, X } from 'lucide-react';

interface AgendamentoModalProps {
  open: boolean;
  onClose: () => void;
  tipoConsulta?: string;
}

export function AgendamentoModal({ open, onClose, tipoConsulta = 'Consultoria' }: AgendamentoModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState<Array<{ start: string; end: string; formatted: string }>>([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: tipoConsulta,
    mensagem: '',
  });

  // Buscar horários disponíveis quando data mudar
  useEffect(() => {
    if (date && step === 2) {
      fetchAvailableSlots();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, step]);

  const fetchAvailableSlots = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/calendar/events?date=${date}`);
      const data = await response.json();
      if (data.slots && Array.isArray(data.slots)) {
        setAvailableSlots(data.slots);
      } else {
        // Se não retornar slots, usar horários padrão
        console.warn('API não retornou slots, usando horários padrão');
        // Gerar horários padrão localmente como fallback
        const defaultSlots = [];
        const selectedDate = new Date(date);
        for (let hour = 9; hour < 18; hour++) {
          const slotStart = new Date(selectedDate);
          slotStart.setHours(hour, 0, 0, 0);
          const slotEnd = new Date(selectedDate);
          slotEnd.setHours(hour + 1, 0, 0, 0);
          defaultSlots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            formatted: `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`,
          });
        }
        setAvailableSlots(defaultSlots);
      }
    } catch (error) {
      console.error('Erro ao buscar horários:', error);
      // Em caso de erro, usar horários padrão
      const defaultSlots = [];
      const selectedDate = new Date(date);
      for (let hour = 9; hour < 18; hour++) {
        const slotStart = new Date(selectedDate);
        slotStart.setHours(hour, 0, 0, 0);
        const slotEnd = new Date(selectedDate);
        slotEnd.setHours(hour + 1, 0, 0, 0);
        defaultSlots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          formatted: `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`,
        });
      }
      setAvailableSlots(defaultSlots);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Encontrar o slot selecionado
      const selectedSlot = availableSlots.find(slot => slot.start === timeSlot);
      if (!selectedSlot) {
        throw new Error('Horário não selecionado');
      }

      const response = await fetch('/api/calendar/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: `${formData.assunto} - ${formData.nome}`,
          description: `Consulta agendada via site Orbee Labs\n\nNome: ${formData.nome}\nEmail: ${formData.email}\nTelefone: ${formData.telefone || 'Não informado'}\n\nMensagem:\n${formData.mensagem || 'Nenhuma mensagem adicional'}`,
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
          attendeeEmail: formData.email,
          attendeeName: formData.nome,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se o erro for de autenticação, redirecionar para autorização
        if (data.error?.includes('Autenticação Google necessária') || data.error?.includes('autorize')) {
          const authUrl = await fetch('/api/auth/google').then(r => r.json());
          if (authUrl.authUrl) {
            window.location.href = authUrl.authUrl;
            return;
          }
        }
        throw new Error(data.error || 'Erro ao agendar');
      }

      setStep(3); // Mostrar sucesso
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao agendar consultoria. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setDate('');
    setTimeSlot('');
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      assunto: tipoConsulta,
      mensagem: '',
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Calcular data mínima (hoje) e máxima (30 dias)
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Agendar Consultoria
          </DialogTitle>
          <DialogDescription>
            {step === 1 && 'Preencha seus dados para agendar'}
            {step === 2 && 'Selecione data e horário disponível'}
            {step === 3 && 'Agendamento confirmado!'}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Seu nome"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone (opcional)</Label>
              <Input
                id="telefone"
                type="tel"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assunto">Tipo de Consultoria *</Label>
              <Select
                value={formData.assunto}
                onValueChange={(value) => setFormData({ ...formData, assunto: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consultoria SEO">Consultoria SEO</SelectItem>
                  <SelectItem value="Consultoria Marketing Digital">Consultoria Marketing Digital</SelectItem>
                  <SelectItem value="Consultoria Desenvolvimento Web">Consultoria Desenvolvimento Web</SelectItem>
                  <SelectItem value="Consultoria Tráfego Pago">Consultoria Tráfego Pago</SelectItem>
                  <SelectItem value="Auditoria SEO">Auditoria SEO</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem (opcional)</Label>
              <Textarea
                id="mensagem"
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                placeholder="Conte-nos sobre suas necessidades..."
                rows={4}
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!formData.nome || !formData.email}>
                Próximo
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Selecione a Data *</Label>
              <Input
                id="date"
                type="date"
                required
                min={today}
                max={maxDateStr}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setTimeSlot(''); // Reset time slot when date changes
                }}
              />
            </div>

            {date && (
              <div className="space-y-2">
                <Label>Horários Disponíveis *</Label>
                {loading && <p className="text-sm text-muted-foreground">Carregando horários...</p>}
                {!loading && availableSlots.length === 0 && (
                  <p className="text-sm text-muted-foreground">Nenhum horário disponível nesta data</p>
                )}
                {!loading && availableSlots.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.start}
                        type="button"
                        variant={timeSlot === slot.start ? 'default' : 'outline'}
                        onClick={() => setTimeSlot(slot.start)}
                        className="text-sm"
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        {slot.formatted}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button type="submit" disabled={!date || !timeSlot || loading}>
                {loading ? 'Agendando...' : 'Confirmar Agendamento'}
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Agendamento Confirmado!</h3>
            <p className="text-muted-foreground">
              Sua consultoria foi agendada com sucesso. Você receberá um email de confirmação com todos os detalhes.
            </p>
            <Button onClick={handleClose} className="w-full">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

