'use client';

import Link from 'next/link';
import { PageLayout } from '@/components/layout';
import { motion } from 'framer-motion';
import { usePageTitle } from '@/hooks/core';

export default function PrivacidadePage() {
  usePageTitle("Política de Privacidade | Orbee Labs - Proteção de Dados e LGPD");

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
                Política de Privacidade
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
                  <h2 className="text-2xl font-bold text-white mb-4">1. Introdução</h2>
                  <p className="text-gray-300 leading-relaxed">
                    A Orbee Labs está comprometida com a proteção da privacidade e dos dados pessoais de nossos usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD) e outras legislações aplicáveis.
                  </p>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">2. Dados Coletados</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Coletamos os seguintes tipos de dados pessoais:
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">2.1 Dados Fornecidos Voluntariamente</h3>
                  <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
                    <li>Nome completo</li>
                    <li>Endereço de e-mail</li>
                    <li>Número de telefone</li>
                    <li>Nome da empresa</li>
                    <li>Mensagens enviadas através de formulários</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">2.2 Dados Coletados Automaticamente</h3>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>Endereço IP</li>
                    <li>Tipo de navegador e dispositivo</li>
                    <li>Páginas visitadas e tempo de permanência</li>
                    <li>Dados de cookies e tecnologias similares</li>
                  </ul>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">3. Finalidades do Tratamento</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Utilizamos seus dados pessoais para as seguintes finalidades:
                  </p>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>Prestação de serviços de marketing digital e desenvolvimento web</li>
                    <li>Comunicação sobre nossos serviços e produtos</li>
                    <li>Envio de newsletter e conteúdo relevante</li>
                    <li>Análise de performance e melhoria dos serviços</li>
                    <li>Cumprimento de obrigações legais</li>
                    <li>Proteção contra fraudes e atividades maliciosas</li>
                  </ul>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">4. Base Legal</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    O tratamento de seus dados pessoais é baseado nas seguintes bases legais:
                  </p>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li><strong>Consentimento:</strong> Para envio de newsletter e comunicações de marketing</li>
                    <li><strong>Execução de contrato:</strong> Para prestação de serviços contratados</li>
                    <li><strong>Interesse legítimo:</strong> Para análise de performance e melhoria dos serviços</li>
                    <li><strong>Cumprimento de obrigação legal:</strong> Para atender exigências legais</li>
                  </ul>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">5. Seus Direitos</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    De acordo com a LGPD, você tem os seguintes direitos:
                  </p>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>Confirmar a existência de tratamento de dados</li>
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                    <li>Solicitar anonimização, bloqueio ou eliminação de dados</li>
                    <li>Solicitar portabilidade dos dados</li>
                    <li>Revogar consentimento a qualquer momento</li>
                    <li>Obter informações sobre compartilhamento de dados</li>
                  </ul>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">6. Contato</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco:
                  </p>
                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <p className="text-gray-300">
                      <strong>E-mail:</strong> <a href="mailto:privacidade@orbeelabs.com" className="text-primary hover:text-primary/80 transition-colors">privacidade@orbeelabs.com</a><br/>
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
              transition={{ duration: 0.6, delay: 0.9 }}
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
