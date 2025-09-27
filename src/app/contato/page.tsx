'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/forms/ContactForm';

export default function ContatoPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-background via-card to-background">
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
              Agende uma consultoria gratuita de 30 minutos e descubra como nossa metodologia SEO Cabuloso
              pode acelerar o crescimento digital do seu negócio.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Lead Generation Form */}
            <ContactForm />

            {/* Benefits & Social Proof */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Guarantee */}
              <div className="glass glass-hover rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-500 text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Garantia de Resultado
                </h3>
                <p className="text-gray-300 text-sm">
                  Se não entregarmos resultados mensuráveis em 90 dias, 
                  devolvemos 100% do seu investimento.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="glass glass-hover rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  Resultados Comprovados
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">150+</div>
                    <div className="text-xs text-gray-400">Projetos Entregues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">340%</div>
                    <div className="text-xs text-gray-400">Aumento Médio de Tráfego</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">280%</div>
                    <div className="text-xs text-gray-400">Crescimento de Leads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">95%</div>
                    <div className="text-xs text-gray-400">Taxa de Satisfação</div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="glass glass-hover rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    RC
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Ricardo Costa</h4>
                    <p className="text-gray-400 text-sm">CEO, TechCorp</p>
                  </div>
                </div>
        <p className="text-gray-300 text-sm mb-4">
          &ldquo;Em 6 meses, a Orbee Labs aumentou nosso tráfego orgânico em 340% e nossas vendas online cresceram 180%. O ROI foi incrível!&rdquo;
        </p>
                <div className="flex text-yellow-500 text-sm">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>

              {/* Contact Options */}
              <div className="glass glass-hover rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-4">
                  Prefere outro canal?
                </h3>
                
                <div className="space-y-4">
                  <a
                    href="https://wa.me/5511999999999"
                    className="flex items-center p-3 bg-green-600/20 border border-green-600/30 rounded-lg hover:bg-green-600/30 transition-colors duration-300"
                  >
                    <span className="text-green-500 text-xl mr-3">💬</span>
                    <div>
                      <p className="text-white font-medium">WhatsApp</p>
                      <p className="text-gray-300 text-sm">Resposta em até 5min</p>
                    </div>
                  </a>
                  
                  <a
                    href="mailto:contato@orbeelabs.com"
                    className="flex items-center p-3 bg-primary/20 border border-primary/30 rounded-lg hover:bg-primary/30 transition-colors duration-300"
                  >
                    <span className="text-primary text-xl mr-3">📧</span>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-300 text-sm">contato@orbeelabs.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
