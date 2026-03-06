'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import ContactForm from '@/components/forms/ContactForm';


export default function ContatoClient() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Contato", url: "https://orbeelabs.com/contato" },
  ];


  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <section className="relative pt-24 md:pt-32 pb-20 overflow-hidden bg-gradient-to-br from-background via-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="heading-xl text-white mb-6">
              Transforme seu Negócio <span className="text-gradient">Hoje</span>
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              Agende uma consultoria gratuita de 30 minutos e descubra como nossa metodologia SEO-VX
              pode acelerar o crescimento digital do seu negócio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-card to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass glass-hover rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Agende sua Consultoria Gratuita
              </h2>
              <p className="text-gray-300">
                Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas
              </p>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-white mb-6">
              Outras formas de <span className="text-gradient">Contato</span>
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Prefere falar diretamente? Entre em contato conosco através dos canais abaixo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📧',
                title: 'Email',
                description: 'contato@orbeelabs.com',
                subtitle: 'Resposta em até 24h'
              },
              {
                icon: '📱',
                title: 'WhatsApp',
                description: '+55 31 98255-6751',
                subtitle: 'Atendimento imediato'
              },
              {
                icon: '💼',
                title: 'LinkedIn',
                description: 'Em breve',
                subtitle: 'Conecte-se conosco'
              }
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-8 text-center"
              >
                <div className="text-6xl mb-6">{contact.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{contact.title}</h3>
                <p className="text-primary font-semibold mb-2">{contact.description}</p>
                <p className="text-gray-400 text-sm">{contact.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}