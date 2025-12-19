'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    servicos: [
      { name: 'SEO-VX', href: '/servicos/seo-bh' },
      { name: 'Desenvolvimento Web', href: '/servicos' },
      { name: 'Marketing Digital', href: '/servicos' },
      { name: 'E-commerce', href: '/servicos' },
      { name: 'Landing Pages', href: '/servicos' },
      { name: 'Analytics', href: '/servicos' },
    ],
    empresa: [
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contato', href: '/contato' },
      { name: 'Carreiras', href: '/carreiras' },
      { name: 'Parceiros', href: '/parceiros' },
    ],
    recursos: [
      { name: 'Auditoria SEO Gratuita', href: '/auditoria-seo' },
      { name: 'Calculadora de ROI', href: '/calculadora-roi' },
      { name: 'Guias e E-books', href: '/recursos' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Cases de Sucesso', href: '/cases' },
      { name: 'Depoimentos', href: '/depoimentos' },
    ],
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: '#',
      icon: '💼',
    },
    { name: 'Instagram', href: 'https://instagram.com/orbeelabs', icon: '📸' },
    { name: 'YouTube', href: 'https://youtube.com/orbeelabs', icon: '📺' },
    { name: 'Twitter', href: 'https://twitter.com/orbeelabs', icon: '🐦' },
  ];

  return (
    <footer className="bg-gradient-to-br from-card via-gray-900 to-card border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6">
              <div className="relative w-48 h-48">
                <img
                  src="/images/logo/logo_branca.webp"
                  alt="Orbee Labs Logo"
                  className="w-full h-full object-contain"
                  width={192}
                  height={192}
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformamos negócios com marketing digital de alta performance e
              desenvolvimento web fullstack. Especialistas em gerar resultados
              reais e mensuráveis.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl hover:bg-primary/20 hover:text-primary transition-all duration-300"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-white mb-6">Serviços</h4>
            <ul className="space-y-3">
              {footerLinks.servicos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-white mb-6">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-white mb-6">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400 text-sm">
              <p>
                © {currentYear} Orbee Labs. Todos os direitos reservados.
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <Link
                  href="/privacidade"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Política de Privacidade
                </Link>
                <Link
                  href="/termos"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Termos de Uso
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Política de Cookies
                </Link>
              </div>
            </div>
            <div className="text-sm text-gray-400 flex items-center space-x-2">
              <span>Feito com</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500"
              >
                ❤️
              </motion.span>
              <span>no Brasil</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

