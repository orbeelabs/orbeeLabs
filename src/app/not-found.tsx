'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold text-gradient bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Oops! Página não encontrada
            </h2>
            <p className="text-body text-gray-300 mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>
            <p className="text-sm text-gray-400">
              Tentativa de acesso: <code className="bg-gray-800 px-2 py-1 rounded text-primary">{pathname}</code>
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Voltar ao Início
            </Link>
            <Link
              href="/contato"
              className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Falar Conosco
            </Link>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 glass glass-hover rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Precisa de ajuda?
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Se você acredita que esta página deveria existir, entre em contato conosco.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/sobre"
                className="text-primary hover:text-yellow-500 transition-colors duration-300"
              >
                Sobre Nós
              </Link>
              <Link
                href="/servicos"
                className="text-primary hover:text-yellow-500 transition-colors duration-300"
              >
                Nossos Serviços
              </Link>
              <Link
                href="/portfolio"
                className="text-primary hover:text-yellow-500 transition-colors duration-300"
              >
                Portfolio
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
