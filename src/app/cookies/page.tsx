'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePageTitle } from '@/hooks/core';
import { PageLayout } from '@/components/layout';

export default function CookiesPage() {
  usePageTitle("Política de Cookies | Orbee Labs - Transparência e Privacidade");

  return (
    <PageLayout>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-background via-card to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Política de Cookies
              </h1>
              <p className="text-xl text-gray-300">
                Última atualização: Janeiro de 2025
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card/50 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10"
            >
              <div className="prose prose-lg prose-invert max-w-none">
                
                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">1. O que são Cookies?</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site sobre como os usuários interagem com ele.
                  </p>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">2. Como Utilizamos os Cookies</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    A Orbee Labs utiliza cookies para melhorar sua experiência em nosso site, analisar o tráfego e personalizar conteúdo. Utilizamos os seguintes tipos de cookies:
                  </p>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">3. Tipos de Cookies Utilizados</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-white mb-3">3.1 Cookies Essenciais</h3>
                      <p className="text-gray-300 leading-relaxed mb-3">
                        Estes cookies são necessários para o funcionamento básico do site e não podem ser desativados.
                      </p>
                      <ul className="text-gray-300 list-disc list-inside space-y-1">
                        <li>Cookies de sessão para manter sua navegação</li>
                        <li>Cookies de segurança para proteger contra ataques</li>
                        <li>Cookies de autenticação para área administrativa</li>
                      </ul>
                      <p className="text-sm text-gray-400 mt-3">
                        <strong>Base legal:</strong> Interesse legítimo para funcionamento do site
                      </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-white mb-3">3.2 Cookies de Performance</h3>
                      <p className="text-gray-300 leading-relaxed mb-3">
                        Estes cookies nos ajudam a entender como os visitantes interagem com nosso site.
                      </p>
                      <ul className="text-gray-300 list-disc list-inside space-y-1">
                        <li>Google Analytics para análise de tráfego</li>
                        <li>Google Tag Manager para gerenciamento de tags</li>
                        <li>Cookies de métricas de performance</li>
                      </ul>
                      <p className="text-sm text-gray-400 mt-3">
                        <strong>Base legal:</strong> Consentimento do usuário
                      </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-white mb-3">3.3 Cookies de Marketing</h3>
                      <p className="text-gray-300 leading-relaxed mb-3">
                        Estes cookies são utilizados para personalizar anúncios e conteúdo relevante.
                      </p>
                      <ul className="text-gray-300 list-disc list-inside space-y-1">
                        <li>Cookies de remarketing</li>
                        <li>Cookies de redes sociais</li>
                        <li>Cookies de publicidade direcionada</li>
                      </ul>
                      <p className="text-sm text-gray-400 mt-3">
                        <strong>Base legal:</strong> Consentimento do usuário
                      </p>
                    </div>
                  </div>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">4. Gerenciamento de Cookies</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Você pode controlar e gerenciar cookies de várias formas:
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">4.1 Configurações do Navegador</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    A maioria dos navegadores permite que você:
                  </p>
                  <ul className="text-gray-300 list-disc list-inside space-y-2 mb-6">
                    <li>Veja quais cookies estão armazenados</li>
                    <li>Exclua cookies individualmente ou todos de uma vez</li>
                    <li>Bloqueie cookies de sites específicos</li>
                    <li>Bloqueie cookies de terceiros</li>
                    <li>Bloqueie todos os cookies</li>
                  </ul>

                  <div className="bg-white/5 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-3">Instruções por Navegador:</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li><strong>Chrome:</strong> Configurações → Privacidade e segurança → Cookies e outros dados do site</li>
                      <li><strong>Firefox:</strong> Opções → Privacidade e segurança → Cookies e dados do site</li>
                      <li><strong>Safari:</strong> Preferências → Privacidade → Gerenciar dados do site</li>
                      <li><strong>Edge:</strong> Configurações → Cookies e permissões do site</li>
                    </ul>
                  </div>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">5. Contato</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco:
                  </p>
                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <p className="text-gray-300">
                      <strong>E-mail:</strong> <a href="mailto:cookies@orbeelabs.com" className="text-primary hover:text-primary/80 transition-colors">cookies@orbeelabs.com</a><br/>
                      <strong>E-mail geral:</strong> <a href="mailto:contato@orbeelabs.com" className="text-primary hover:text-primary/80 transition-colors">contato@orbeelabs.com</a>
                    </p>
                  </div>
                </motion.section>

              </div>
            </motion.div>

            {/* Back Button */}
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link 
                href="/" 
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors duration-200"
              >
                ← Voltar ao Início
              </Link>
            </motion.div>
          </div>
        </section>
    </PageLayout>
  );
}
