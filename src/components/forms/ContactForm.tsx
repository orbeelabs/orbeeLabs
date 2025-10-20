'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  FormField, 
  FormInput, 
  FormSelect, 
  FormTextarea, 
  FormSubmitButton, 
  FormBenefits 
} from './fields';
import { 
  validationRules, 
  formatPhone, 
  selectOptions, 
  formBenefits 
} from '@/lib/form-validation';

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
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      revenue: '',
      objective: '',
      challenge: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Enviar para API real
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: data.name,
          email: data.email,
          telefone: data.phone,
          empresa: data.company,
          mensagem: data.challenge,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar mensagem');
      }
      
      // Mostrar toast de sucesso
      toast({
        title: "Sucesso!",
        description: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        variant: "success",
      });
      
      // Resetar formulário
      reset();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <FormField delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Nome Completo"
            placeholder="Seu nome completo"
            required
            error={errors.name}
            {...register('name', validationRules.name)}
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="seu@email.com"
            required
            error={errors.email}
            {...register('email', validationRules.email)}
          />
        </FormField>

        {/* Telefone e Empresa */}
        <FormField delay={0.3} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="WhatsApp"
            type="tel"
            placeholder="(31) 98255-6751"
            required
            error={errors.phone}
            {...register('phone', {
              ...validationRules.phone,
              onChange: (e) => {
                const formatted = formatPhone(e.target.value);
                e.target.value = formatted;
              }
            })}
          />
          <FormInput
            label="Empresa/Marca"
            placeholder="Nome da sua empresa"
            required
            error={errors.company}
            {...register('company', validationRules.company)}
          />
        </FormField>

        {/* Website */}
        <FormField delay={0.4}>
          <FormInput
            label="Website"
            type="url"
            placeholder="https://seusite.com.br"
            error={errors.website}
            {...register('website', validationRules.website)}
          />
        </FormField>

        {/* Faturamento */}
        <FormField delay={0.5}>
          <FormSelect
            label="Faturamento Mensal Atual"
            placeholder="Selecione a faixa"
            options={selectOptions.revenue}
            error={errors.revenue}
            {...register('revenue')}
          />
        </FormField>

        {/* Objetivo */}
        <FormField delay={0.6}>
          <FormSelect
            label="Principal Objetivo"
            placeholder="Selecione seu objetivo"
            options={selectOptions.objective}
            error={errors.objective}
            {...register('objective')}
          />
        </FormField>

        {/* Desafio */}
        <FormField delay={0.7}>
          <FormTextarea
            label="Conte sobre seu maior desafio atual"
            placeholder="Ex: Tenho dificuldade em aparecer no Google, meus concorrentes estão à frente, preciso de mais clientes..."
            required
            error={errors.challenge}
            {...register('challenge', validationRules.message)}
          />
        </FormField>

        {/* Benefícios */}
        <FormBenefits
          title="O que você receberá GRÁTIS:"
          benefits={formBenefits}
        />

        {/* Botão de Submit */}
        <FormSubmitButton isLoading={isSubmitting}>
          Agendar Consultoria Gratuita
        </FormSubmitButton>
      </form>
    </motion.div>
  );
}