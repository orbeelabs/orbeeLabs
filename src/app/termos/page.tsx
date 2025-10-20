'use client';

import Link from 'next/link';
import { PageLayout } from '@/components/layout';
import { motion } from 'framer-motion';
import { usePageTitle } from '@/hooks/core';

export default function TermosPage() {
  usePageTitle("Termos de Uso | Orbee Labs - Condições e Responsabilidades");

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
                Termos de Uso
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
                  <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Ao acessar e utilizar os serviços da Orbee Labs, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.
                  </p>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">2. Descrição dos Serviços</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    A Orbee Labs oferece os seguintes serviços:
                  </p>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>Consultoria em marketing digital</li>
                    <li>Desenvolvimento de websites e aplicações web</li>
                    <li>Otimização para mecanismos de busca (SEO)</li>
                    <li>Auditoria de sites e análise de performance</li>
                    <li>Calculadora de ROI para projetos digitais</li>
                    <li>Newsletter com conteúdo especializado</li>
                  </ul>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">3. Uso Aceitável</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Você concorda em usar nossos serviços apenas para fins legais e de acordo com estes termos. É proibido:
                  </p>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>Usar os serviços para atividades ilegais ou não autorizadas</li>
                    <li>Tentar obter acesso não autorizado a sistemas ou dados</li>
                    <li>Interferir no funcionamento normal dos serviços</li>
                    <li>Transmitir vírus, malware ou código malicioso</li>
                    <li>Usar os serviços para spam ou comunicações não solicitadas</li>
                  </ul>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">4. Propriedade Intelectual</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Todo o conteúdo disponibilizado através de nossos serviços, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e software, é propriedade da Orbee Labs ou de seus licenciadores e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.
                  </p>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">5. Limitação de Responsabilidade</h2>
                  <p className="text-gray-300 leading-relaxed">
                    A Orbee Labs não será responsável por danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar nossos serviços, incluindo, mas não limitado a, perda de lucros, dados ou outras perdas intangíveis.
                  </p>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">6. Modificações dos Termos</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação. O uso continuado dos serviços após as modificações constitui aceitação dos novos termos.
                  </p>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">7. Lei Aplicável</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
                  </p>
                </motion.section>

                <motion.section 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">8. Contato</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Se você tiver dúvidas sobre estes termos, entre em contato conosco através do email: <a href="mailto:contato@orbeelabs.com" className="text-primary hover:text-primary/80 transition-colors">contato@orbeelabs.com</a>
                  </p>
                </motion.section>

              </div>
            </motion.div>

            {/* Back Button */}
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
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
