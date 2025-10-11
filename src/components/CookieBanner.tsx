'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Declaração de tipo para gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters: Record<string, string>) => void;
  }
}

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Sempre true, não pode ser desabilitado
    performance: false,
    marketing: false,
  });

  useEffect(() => {
    // Verificar se o usuário já fez uma escolha
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    } else {
      // Carregar preferências salvas
      const savedPreferences = localStorage.getItem('cookiePreferences');
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      performance: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    setShowBanner(false);
    
    // Ativar Google Analytics se aceito
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      performance: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem('cookieConsent', 'essential');
    localStorage.setItem('cookiePreferences', JSON.stringify(essentialOnly));
    setShowBanner(false);
    
    // Bloquear Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setShowBanner(false);
    setShowPreferences(false);
    
    // Atualizar consentimento do Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.performance ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
      });
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Não pode ser alterado
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm"
      >
        <div className="bg-card/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/20">
          <div className="p-4">
            {/* Header Compacto */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">🍪</span>
                </div>
                <h3 className="text-sm font-semibold text-white">
                  Cookies
                </h3>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Compacto */}
            <div className="mb-4">
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                Utilizamos cookies para melhorar sua experiência. 
                <Link 
                  href="/cookies" 
                  className="text-primary hover:text-primary/80 text-xs font-medium transition-colors ml-1"
                >
                  Saiba mais
                </Link>
              </p>
            </div>

            {/* Preferences Panel Compacto */}
            {showPreferences && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <h4 className="font-medium text-white mb-3 text-sm">Personalizar</h4>
                
                <div className="space-y-3">
                  {/* Essential Cookies */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-white text-xs">Essenciais</h5>
                      <p className="text-xs text-gray-400">Sempre ativo</p>
                    </div>
                    <div className="w-8 h-4 bg-primary rounded-full flex items-center justify-end px-1">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Performance Cookies */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-white text-xs">Performance</h5>
                      <p className="text-xs text-gray-400">Analytics</p>
                    </div>
                    <button
                      onClick={() => togglePreference('performance')}
                      className={`w-8 h-4 rounded-full flex items-center transition-colors ${
                        preferences.performance ? 'bg-primary justify-end' : 'bg-gray-600 justify-start'
                      }`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full mx-0.5"></div>
                    </button>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-white text-xs">Marketing</h5>
                      <p className="text-xs text-gray-400">Personalização</p>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`w-8 h-4 rounded-full flex items-center transition-colors ${
                        preferences.marketing ? 'bg-primary justify-end' : 'bg-gray-600 justify-start'
                      }`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full mx-0.5"></div>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Actions Compactas */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={acceptEssential}
                  className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 text-xs"
                >
                  Apenas Essenciais
                </button>
                
                <button
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/20 transition-colors duration-200 text-xs"
                >
                  {showPreferences ? 'Ocultar' : 'Opções'}
                </button>
              </div>
              
              <button
                onClick={acceptAll}
                className="w-full px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors duration-200 text-xs"
              >
                Aceitar Todos
              </button>
            </div>

            {/* Save Preferences Button */}
            {showPreferences && (
              <div className="mt-3">
                <button
                  onClick={savePreferences}
                  className="w-full px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors duration-200 text-xs"
                >
                  Salvar Preferências
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
