'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: 'Início', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Calculadora ROI', href: '/calculadora-roi' },
    { name: 'Auditoria SEO', href: '/auditoria-seo' },
    { name: 'Contato', href: '/contato' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    // Para rotas exatas, verifica se é exatamente igual ou começa com o href seguido de /
    // Isso evita que /sobre seja marcado como ativo quando está em /sobre-algo
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Removido o useEffect de scroll - header sempre com glass effect
  // useEffect removido pois não é mais necessário

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl border-b border-white/10 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3"
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-primary-foreground font-bold text-xl">OL</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-yellow-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                  Orbee <span className="text-gradient">Labs</span>
                </h1>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-white hover:text-primary'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/20 rounded-lg z-0"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  {!isActive(item.href) && (
                    <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button / Admin Link */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hidden lg:flex items-center space-x-4"
          >
            {session ? (
              <>
                <Link
                  href="/admin"
                  className="text-white hover:text-primary transition-colors duration-300"
                >
                  Admin
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/contato"
                className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Fale Conosco
              </Link>
            )}
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            <div className="relative w-6 h-6">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                className="absolute left-0 top-1/2 w-6 h-0.5 bg-white transform origin-center transition-all duration-300"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="absolute left-0 top-1/2 w-6 h-0.5 bg-white transform -translate-y-1/2 transition-all duration-300"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                className="absolute left-0 top-1/2 w-6 h-0.5 bg-white transform origin-center transition-all duration-300"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="glass rounded-2xl mt-4 p-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/20'
                          : 'text-white hover:text-primary hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="pt-4 border-t border-white/20"
                >
                  <Link
                    href="/contato"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground text-center px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Fale Conosco
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

