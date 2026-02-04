'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.2em] text-center text-white uppercase mb-6 md:mb-8">
      {children}
    </h2>
  );
}

interface DecCaseData {
  slug: string;
  clientName: string | null;
  title: string;
  description: string;
  industry: string;
  siteUrl: string | null;
  heroImage: string | null;
  sitePreviewDesktop: string | null;
  sitePreviewMobile: string | null;
}

interface CaseResultCardProps {
  name: string;
  specialty: string;
  tagline: string;
  image: string;
  href: string;
  ctaLabel: string;
  externalLink?: boolean;
}

function CaseResultCard({ name, specialty, tagline, image, href, ctaLabel, externalLink }: CaseResultCardProps) {
  const isDataUrl = image.startsWith('data:');
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-card/80 backdrop-blur-sm shadow-xl flex flex-col h-full">
      <div className="relative aspect-[4/3] w-full bg-muted">
        {isDataUrl ? (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized={image.startsWith('http')}
          />
        )}
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <p className="text-lg md:text-xl font-bold text-white">{name}</p>
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">{specialty}</p>
        <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">{tagline}</p>
        {externalLink ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground font-semibold text-center text-sm hover:shadow-lg hover:opacity-95 transition-all"
          >
            {ctaLabel}
          </a>
        ) : (
          <Link
            href={href}
            className="block w-full py-3 rounded-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground font-semibold text-center text-sm hover:shadow-lg hover:opacity-95 transition-all"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

const DEC_CASE_SLUGS = [
  'dra-laura-thiersch-neuropediatra',
  'dra-bruna-vilela-neuropediatra',
  'eric-moreira-psicologo-tcc',
] as const;

function getCardImage(caseData: DecCaseData | null): string {
  if (!caseData) return '/images/portfolio/default-hero.jpg';
  const img = caseData.sitePreviewDesktop || caseData.sitePreviewMobile || caseData.heroImage;
  return img || '/images/portfolio/default-hero.jpg';
}

function getCardLink(caseData: DecCaseData | null, slug: string): { href: string; label: string; external: boolean } {
  if (!caseData?.siteUrl) return { href: `/portfolio/${slug}`, label: 'Ver case completo', external: false };
  return { href: caseData.siteUrl, label: 'Visitar site', external: true };
}

export default function DecPage() {
  const [caseData, setCaseData] = useState<Record<string, DecCaseData | null>>({
    [DEC_CASE_SLUGS[0]]: null,
    [DEC_CASE_SLUGS[1]]: null,
    [DEC_CASE_SLUGS[2]]: null,
  });

  useEffect(() => {
    const fetchCases = async () => {
      const results = await Promise.all(
        DEC_CASE_SLUGS.map(async (slug) => {
          try {
            const res = await fetch(`/api/portfolio/${slug}`);
            if (!res.ok) return { slug, data: null };
            const json = await res.json();
            return {
              slug,
              data: {
                slug: json.slug,
                clientName: json.clientName,
                title: json.title,
                description: json.description,
                industry: json.industry,
                siteUrl: json.siteUrl,
                heroImage: json.heroImage,
                sitePreviewDesktop: json.sitePreviewDesktop,
                sitePreviewMobile: json.sitePreviewMobile,
              } as DecCaseData,
            };
          } catch {
            return { slug, data: null };
          }
        })
      );
      setCaseData((prev) => {
        const next = { ...prev };
        results.forEach(({ slug, data }) => {
          next[slug] = data;
        });
        return next;
      });
    };
    fetchCases();
  }, []);

  const laura = caseData[DEC_CASE_SLUGS[0]];
  const bruna = caseData[DEC_CASE_SLUGS[1]];
  const eric = caseData[DEC_CASE_SLUGS[2]];

  return (
    <div className="min-h-screen bg-[#0a1628] text-white overflow-x-hidden">
      {/* Hero — só a imagem, sem texto em cima */}
      <section className="relative w-full aspect-[16/10] min-h-[70vh] overflow-hidden">
        <Image
          src="/images/portfolio/default-hero.jpg"
          alt="Orbee Labs — Conectividade global e inovação"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </section>

      {/* Texto que estava na capa — seção logo abaixo da imagem */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1628]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[0.15em] uppercase mb-6"
          >
            Inovação, performance e resultados em um único ecossistema.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            Na Orbee Labs, nós não apenas seguimos as tendências, nós as criamos. Somos mais que uma
            agência: somos arquitetos de soluções digitais que posicionam sua empresa à frente da concorrência.
          </motion.p>
        </div>
      </section>

      {/* CIÊNCIA E TECNOLOGIA */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0d2137]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTitle>Ciência e tecnologia</SectionTitle>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed text-center">
              Chega de gerenciar múltiplas agências, lidar com silos de comunicação e processos repetitivos.
              Centralizamos o que você mais precisa em um ecossistema coeso e inteligente. Em vez de pagar mais
              por serviços isolados, você acessa uma operação 360° onde desenvolvimento, software, marketing
              e design trabalham em perfeita sintonia. O resultado é mais eficiência, menos custos e um impacto
              muito maior, tudo gerenciado por um único ponto de contato.
            </p>
          </motion.div>
        </div>
      </section>

      {/* A TECNOLOGIA QUE GARANTE RESULTADOS REAIS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] to-[#0d2137]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTitle>A tecnologia que garante resultados reais</SectionTitle>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
              Nosso grande diferencial é a metodologia proprietária <span className="text-primary font-semibold">SEO-VX</span>. Desenvolvida por nossa especialista,
              Diana Caldeira, essa tecnologia funde SEO técnico de ponta com automações inteligentes. Isso nos
              permite ir além de promessas vazias, garantindo entregas precisas e, o mais importante, resultados
              mensuráveis e sustentáveis para o seu negócio.
            </p>
            <SectionTitle>Performance validada contra o padrão de ouro do mercado</SectionTitle>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
              Para testar nossa metodologia no mais alto nível, atuamos em colaboração direta com as equipes
              de especialistas das maiores plataformas de busca do mundo.
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
              Enquanto suas campanhas atingiram taxas de conversão de 8 a 10%, um resultado já considerado
              excelente, nossa tecnologia SEO-VX entregou entre 30 a 45% de conversão.
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Essa performance superior comprova nosso compromisso com resultados reais, e não apenas promessas.
              É por isso que oferecemos uma <strong className="text-white">Garantia de Performance Absoluta</strong>:
              se não entregarmos resultados tangíveis, seu investimento é integralmente devolvido. Confiamos em nosso método para transformar
              sua marca em uma referência de mercado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NOSSOS RESULTADOS COMPROVADOS — Case Dra. Laura */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0d2137]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTitle>Nossos resultados comprovados</SectionTitle>
            <h3 className="text-lg md:text-xl font-bold text-primary mb-8 text-center">
              Case neuropediatra: de turnos livres a 100% de ocupação em 2 meses
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-3 space-y-6 text-gray-300">
                <p><span className="text-primary font-bold text-sm uppercase tracking-wider">O desafio:</span>{' '}
                  Dra. Laura Thiersch, neuropediatra, possuía 4 turnos disponíveis em sua agenda,
                  representando uma grande oportunidade de crescimento que não estava sendo aproveitada
                  por falta de um fluxo constante de novos pacientes.</p>
                <p><span className="text-primary font-bold text-sm uppercase tracking-wider">A solução Orbee Labs:</span>{' '}
                  Implementamos nossa metodologia &quot;SEO-VX&quot; de forma escalada,
                  focada em criar autoridade e atrair o público certo através de uma estratégia digital completa:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong className="text-white">Website de Alta Performance:</strong> Desenvolvimento de um site robusto com foco em conversão e experiência do usuário.</li>
                  <li><strong className="text-white">Blog Engine e Conteúdo Estratégico:</strong> Criação de mais de 80 artigos educativos para atrair tráfego qualificado.</li>
                  <li><strong className="text-white">SEO Local Agressivo:</strong> Otimização para buscas na região, garantindo visibilidade para pacientes próximos.</li>
                </ul>
                <p><span className="text-primary font-bold text-sm uppercase tracking-wider">A transformação (resultados):</span>{' '}
                  Em apenas 2 meses, transformamos completamente
                  a captação de pacientes da Dra. Laura, provando a eficácia da nossa abordagem:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">83</p>
                    <p className="text-xs text-gray-400">Leads em 60 dias</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">R$ 5,24</p>
                    <p className="text-xs text-gray-400">Por lead</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">31,09%</p>
                    <p className="text-xs text-gray-400">Conversão</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">100%</p>
                    <p className="text-xs text-gray-400">Ocupação</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <CaseResultCard
                  name={laura?.clientName || 'Dra. Laura Thiersch'}
                  specialty="Neuropediatra"
                  tagline={laura?.description || 'Cuidado humanizado para o desenvolvimento do seu filho. Especialista em TDAH, TEA e neurologia pediátrica.'}
                  image={getCardImage(laura)}
                  href={getCardLink(laura, DEC_CASE_SLUGS[0]).href}
                  ctaLabel={getCardLink(laura, DEC_CASE_SLUGS[0]).label}
                  externalLink={getCardLink(laura, DEC_CASE_SLUGS[0]).external}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Dra. Bruna */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0d2137] to-[#0a1628]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-lg md:text-xl font-bold text-primary mb-8 text-center">
              Case neuropediatra: do zero ao ROI de +400% em 60 dias
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-3 space-y-6 text-gray-300">
                <p><span className="text-primary font-bold text-sm uppercase tracking-wider">O desafio:</span>{' '}
                  Dra. Bruna Vilela, uma neuropediatra altamente qualificada,
                  tinha zero presença digital. Seu crescimento era limitado apenas a indicações presenciais,
                  resultando em oportunidades perdidas e dificuldade em se posicionar
                  como autoridade para atrair os pacientes certos (pais buscando especialistas em TDAH, TEA, etc.).</p>
                <p><span className="text-primary font-bold text-sm uppercase tracking-wider">A solução Orbee Labs:</span>{' '}
                  Ativamos a estratégia &quot;SEO-VX&quot; com 6 pilares para construir
                  sua autoridade digital e gerar um fluxo constante de agendamentos:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong className="text-white">Auditoria e Diagnóstico de Autoridade (E-E-A-T):</strong> Mapeamento completo para construir credibilidade digital.</li>
                  <li><strong className="text-white">Desenvolvimento Web Moderno (React 19):</strong> Criação de um site de altíssima velocidade e focado em conversão mobile.</li>
                  <li><strong className="text-white">Conteúdo Educativo e SEO Técnico:</strong> Posicionamento de artigos para as buscas exatas que os pais realizam.</li>
                </ul>
                <p><span className="text-primary font-bold text-sm uppercase tracking-wider">A transformação (resultados):</span>{' '}
                  Em 2 meses, a agenda da Dra. Bruna estava
                  100% ocupada. Em 6 meses, os resultados se consolidaram, estabelecendo-a como referência.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">+400%</p>
                    <p className="text-xs text-gray-400">De ROI</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">100%</p>
                    <p className="text-xs text-gray-400">Ocupação</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">8,21%</p>
                    <p className="text-xs text-gray-400">CTR</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">4%</p>
                    <p className="text-xs text-gray-400">Conversão</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <CaseResultCard
                  name={bruna?.clientName || 'Dra. Bruna Vilela'}
                  specialty="Neuropediatra"
                  tagline={bruna?.description || 'De zero presença digital a agenda 100% ocupada em 2 meses. Especialista em desenvolvimento infantil e neuropediatria.'}
                  image={getCardImage(bruna)}
                  href={getCardLink(bruna, DEC_CASE_SLUGS[1]).href}
                  ctaLabel={getCardLink(bruna, DEC_CASE_SLUGS[1]).label}
                  externalLink={getCardLink(bruna, DEC_CASE_SLUGS[1]).external}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Psicologia */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a1628]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-lg md:text-xl font-bold text-primary mb-8 text-center">
              Case psicologia: de zero a referência em TCC com 1.250% de ROI no 1º mês
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-3 space-y-6 text-gray-300">
                <p><span className="text-primary font-bold text-sm uppercase tracking-wider">O desafio:</span>{' '}
                  Um psicólogo especialista em Terapia Cognitivo-Comportamental (TCC) tinha zero
                  presença online e enfrentava o desafio de se posicionar como autoridade para se destacar da
                  concorrência e atrair um público específico para terapia, que muitas vezes busca ajuda
                  sem saber qual abordagem seguir.</p>
                <p><span className="text-primary font-bold text-sm uppercase tracking-wider">A solução Orbee Labs:</span>{' '}
                  Desenvolvemos uma estratégia de <strong className="text-white">Autoridade Digital Imediata</strong>,
                  focada em gerar resultados rápidos e construir uma base sólida para o crescimento a longo prazo:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong className="text-white">Auditoria e Diagnóstico de Autoridade (E-E-A-T):</strong> Implementação de mais de 30 otimizações para reforçar a credibilidade e expertise da profissional.</li>
                  <li><strong className="text-white">Tráfego Qualificado com Google Ads:</strong> Campanhas ultra-segmentadas para atrair pacientes com intenção real de agendar uma consulta.</li>
                  <li><strong className="text-white">Website de Alta Conversão:</strong> Desenvolvimento de uma página focada em transformar visitantes em leads com um Custo por Lead (CPL) mínimo.</li>
                </ul>
                <p><span className="text-primary font-bold text-sm uppercase tracking-wider">Resultados do 1º mês (projeto em andamento):</span>{' '}
                  Os resultados iniciais já demonstram o impacto explosivo da nossa metodologia.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">1.250%</p>
                    <p className="text-xs text-gray-400">ROI 1º mês</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">R$ 9,21</p>
                    <p className="text-xs text-gray-400">Por lead</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">30</p>
                    <p className="text-xs text-gray-400">Leads</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-primary">+100</p>
                    <p className="text-xs text-gray-400">Pacientes/mês</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <CaseResultCard
                  name={eric?.clientName || 'Eric Moreira'}
                  specialty="Psicólogo · TCC"
                  tagline={eric?.description || 'Posicionamento como autoridade em Terapia Cognitivo-Comportamental. De zero presença a 1.250% de ROI no primeiro mês.'}
                  image={getCardImage(eric)}
                  href={getCardLink(eric, DEC_CASE_SLUGS[2]).href}
                  ctaLabel={getCardLink(eric, DEC_CASE_SLUGS[2]).label}
                  externalLink={getCardLink(eric, DEC_CASE_SLUGS[2]).external}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONHEÇA NOSSAS LÍDERES */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0d2137]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTitle>Conheça nossas líderes</SectionTitle>
            <div className="space-y-12">
              <div className="glass rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src="/images/team/Diana.webp"
                    alt="Diana Caldeira"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-primary mb-1">Diana Caldeira</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Head of Technology & Innovation</p>
                  <p className="text-gray-300 leading-relaxed">
                    Como a mente idealizadora e arquiteta por trás do método proprietário SEO-VX, Diana Caldeira personifica
                    o DNA da Orbee Labs: a fusão entre estratégia de negócio e excelência tecnológica.
                    Com mais de 18 anos de experiência, Diana une sua expertise em vendas e negócios com um profundo
                    domínio em desenvolvimento Full-Stack e Inteligência Artificial.
                    Já desenvolveu mais de inúmeros aplicativos e sites, formou centenas de profissionais em diversos cursos
                    que ministrou. Sua visão é o que transforma os desafios dos nossos clientes em resultados extraordinários.
                  </p>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src="/images/team/Iza.webp"
                    alt="Izabela Fissicaro"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-primary mb-1">Izabela Fissicaro</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Head of Creative & Brand Strategy</p>
                  <p className="text-gray-300 leading-relaxed">
                    A alma criativa da Orbee Labs, responsável por transformar marcas em experiências visuais memoráveis.
                    Com formação em Design e Fotografia, Izabela traz um olhar sofisticado e detalhista, refinado em sua
                    experiência no mercado de alto padrão. Ela lidera a criação de identidades visuais, estratégias de social
                    media e toda a direção de arte da empresa.
                    Sua missão é garantir que a essência de cada cliente seja traduzida em um design que não apenas
                    impressiona, mas também conecta e perdura.
                  </p>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src="/images/team/Gabi.webp"
                    alt="Gabi Cipriano"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-primary mb-1">Gabi Cipriano</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Head of Technical Strategy & Business</p>
                  <p className="text-gray-300 leading-relaxed">
                    A ponte estratégica entre nossa tecnologia de ponta e o sucesso dos nossos clientes.
                    Ela combina excelência técnica, validada por instituições como Harvard e IBM Berlin, com uma rara visão
                    de negócios focada em inovação.
                    É especialista em IA e Web3, com expertise sólida em blockchain e implementação de soluções tecnológicas
                    corporativas. Lidera nossa frente comercial e de relacionamento, traduzindo as necessidades dos clientes em
                    soluções inovadoras e garantindo parcerias de sucesso e confiança.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Um convite + CTA com contato (acima da imagem final) */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] to-[#0d2137]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTitle>Um convite para o futuro da sua marca</SectionTitle>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-12 text-center">
              Você acaba de conhecer a força de um ecossistema 360° que não aceita o comum. Na Orbee Labs, integramos
              tecnologia de ponta, como nosso método proprietário SEO-VX, para entregar resultados que transformam negócios.
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-12 text-center">
              Neste momento, não estamos apenas buscando clientes. Estamos selecionando parceiros visionários para
              construir conosco um portfólio de sucesso definitivo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bloco da foto: título + contatos (links) — em cima da imagem de baixo */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-3"
          >
            Pronto para deixar sua marca no mundo?
          </motion.h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" aria-hidden />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <a
              href="https://wa.me/5531982556751"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors font-medium"
              aria-label="Falar no WhatsApp (31) 98255-6751"
            >
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>(31) 98255-6751</span>
            </a>
            <a
              href="https://www.orbeelabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors font-medium"
              aria-label="Acessar site www.orbeelabs.com"
            >
              <span>www.orbeelabs.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Imagem do hero repetida no final */}
      <section className="relative w-full aspect-[16/10] min-h-[50vh] overflow-hidden">
        <Image
          src="/images/portfolio/default-hero.jpg"
          alt="Orbee Labs — Conectividade global e inovação"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </section>
    </div>
  );
}
