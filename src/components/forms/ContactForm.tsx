'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website?: string;
  revenue: string;
  objective: string;
  challenge: string;
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Dados do formulário:', data);
      
      // Mostrar toast de sucesso
      toast({
        title: "Sucesso!",
        description: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        variant: "success",
      });
      
      // Resetar formulário
      reset();
    } catch {
      toast({
        title: "Erro",
        description: "Erro ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para formatar telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass glass-hover rounded-2xl p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          Consultoria Gratuita de 30min
        </h2>
        <p className="text-gray-300 text-sm">
          Análise completa do seu site + estratégia personalizada
        </p>
      </motion.div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome e Email */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Nome Completo *
            </label>
            <input
              {...register('name')}
              type="text"
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
                errors.name ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="Seu nome completo"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
                errors.email ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Telefone e Empresa */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              WhatsApp *
            </label>
            <input
              {...register('phone')}
              type="tel"
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                e.target.value = formatted;
                register('phone').onChange(e);
              }}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
                errors.phone ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="(11) 99999-9999"
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.phone.message}
              </motion.p>
            )}
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Empresa/Marca *
            </label>
            <input
              {...register('company')}
              type="text"
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
                errors.company ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="Nome da sua empresa"
            />
            {errors.company && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.company.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Website */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Website
          </label>
          <input
            {...register('website')}
            type="url"
            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
              errors.website ? 'border-red-500' : 'border-white/20'
            }`}
            placeholder="https://seusite.com.br"
          />
          {errors.website && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.website.message}
            </motion.p>
          )}
        </motion.div>

        {/* Faturamento */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Faturamento Mensal Atual
          </label>
          <select
            {...register('revenue')}
            className={`w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors duration-300 ${
              errors.revenue ? 'border-red-500' : 'border-gray-600'
            }`}
          >
            <option value="">Selecione a faixa</option>
            <option value="ate-10k">Até R$ 10mil</option>
            <option value="10k-50k">R$ 10mil - R$ 50mil</option>
            <option value="50k-100k">R$ 50mil - R$ 100mil</option>
            <option value="100k-500k">R$ 100mil - R$ 500mil</option>
            <option value="500k-mais">R$ 500mil+</option>
          </select>
          {errors.revenue && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.revenue.message}
            </motion.p>
          )}
        </motion.div>

        {/* Objetivo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Principal Objetivo
          </label>
          <select
            {...register('objective')}
            className={`w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors duration-300 ${
              errors.objective ? 'border-red-500' : 'border-gray-600'
            }`}
          >
            <option value="">Selecione seu objetivo</option>
            <option value="mais-leads">Gerar mais leads qualificados</option>
            <option value="aumentar-vendas">Aumentar vendas online</option>
            <option value="visibilidade">Melhorar visibilidade no Google</option>
            <option value="site-novo">Criar/refazer website</option>
            <option value="competir">Superar concorrentes</option>
            <option value="outros">Outros objetivos</option>
          </select>
          {errors.objective && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.objective.message}
            </motion.p>
          )}
        </motion.div>

        {/* Desafio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Conte sobre seu maior desafio atual *
          </label>
          <textarea
            {...register('challenge')}
            rows={4}
            className={`w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300 resize-none ${
              errors.challenge ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Ex: Tenho dificuldade em aparecer no Google, meus concorrentes estão à frente, preciso de mais clientes..."
          />
          {errors.challenge && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.challenge.message}
            </motion.p>
          )}
        </motion.div>

        {/* Benefícios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-primary/10 border border-primary/30 rounded-lg p-4"
        >
          <h4 className="text-primary font-semibold mb-2">O que você receberá GRÁTIS:</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>✓ Auditoria técnica do seu site</li>
            <li>✓ Análise de concorrentes</li>
            <li>✓ Oportunidades de crescimento</li>
            <li>✓ Estratégia personalizada</li>
            <li>✓ Estimativa de ROI</li>
          </ul>
        </motion.div>

        {/* Botão de Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-yellow-500 hover:shadow-lg hover:scale-105'
            }`}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="flex items-center justify-center"
              >
                <span className="mr-2">⏳</span>
                Enviando...
              </motion.div>
            ) : (
              'Agendar Consultoria Gratuita'
            )}
          </motion.button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Seus dados estão seguros. Não enviamos spam.
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}