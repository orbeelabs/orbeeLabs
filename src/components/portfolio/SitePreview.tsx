'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Zap, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PerformanceMetrics {
  lcp?: number;
  inp?: number;
  cls?: number;
  score?: number;
}

interface SitePreviewProps {
  siteUrl: string;
  previewMobile?: string;
  previewDesktop?: string;
  performanceMetrics?: PerformanceMetrics;
  clientName?: string;
  className?: string;
}

export default function SitePreview({
  siteUrl,
  previewMobile,
  previewDesktop,
  performanceMetrics,
  clientName,
  className = '',
}: SitePreviewProps) {
  // Por enquanto, apenas desktop (mobile será implementado depois)
  const currentPreview = previewDesktop;

  // Se não tem preview, mostrar placeholder
  if (!currentPreview) {
    return (
      <div className={`site-preview-placeholder ${className}`}>
        <div className="glass rounded-2xl p-8 text-center">
          <Activity className="w-16 h-16 text-primary/50 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Preview do site ainda não foi gerado</p>
          <p className="text-gray-500 text-sm mb-6">
            O preview será exibido aqui após ser gerado no painel administrativo
          </p>
          <Button
            variant="outline"
            onClick={() => window.open(siteUrl, '_blank')}
            className="border-primary text-primary"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver Site ao Vivo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`site-preview-container ${className}`}>
      {/* Frame Desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative mx-auto w-full"
        style={{
          maxWidth: '1920px',
        }}
      >
        {/* Frame Visual */}
        <div className="relative overflow-hidden desktop-frame shadow-2xl">
          {/* Screenshot */}
          {currentPreview && (
            <img
              src={currentPreview}
              alt={`Preview desktop do site ${clientName || siteUrl}`}
              className="w-full h-auto"
              loading="lazy"
            />
          )}
        </div>
      </motion.div>

      {/* Métricas de Performance */}
      {performanceMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 glass rounded-xl p-6"
        >
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Performance Metrics
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {performanceMetrics.lcp !== undefined && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {performanceMetrics.lcp}s
                </div>
                <div className="text-xs text-gray-400">LCP</div>
                <div className={`text-xs mt-1 ${
                  performanceMetrics.lcp <= 0.8 ? 'text-green-400' : 
                  performanceMetrics.lcp <= 2.5 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {performanceMetrics.lcp <= 0.8 ? '✅ Excelente' : 
                   performanceMetrics.lcp <= 2.5 ? '⚠️ Bom' : '❌ Precisa Melhorar'}
                </div>
              </div>
            )}

            {performanceMetrics.inp !== undefined && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {performanceMetrics.inp}ms
                </div>
                <div className="text-xs text-gray-400">INP</div>
                <div className={`text-xs mt-1 ${
                  performanceMetrics.inp <= 200 ? 'text-green-400' : 
                  performanceMetrics.inp <= 500 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {performanceMetrics.inp <= 200 ? '✅ Excelente' : 
                   performanceMetrics.inp <= 500 ? '⚠️ Bom' : '❌ Precisa Melhorar'}
                </div>
              </div>
            )}

            {performanceMetrics.cls !== undefined && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {performanceMetrics.cls}
                </div>
                <div className="text-xs text-gray-400">CLS</div>
                <div className={`text-xs mt-1 ${
                  performanceMetrics.cls <= 0.05 ? 'text-green-400' : 
                  performanceMetrics.cls <= 0.1 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {performanceMetrics.cls <= 0.05 ? '✅ Excelente' : 
                   performanceMetrics.cls <= 0.1 ? '⚠️ Bom' : '❌ Precisa Melhorar'}
                </div>
              </div>
            )}

            {performanceMetrics.score !== undefined && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {performanceMetrics.score}
                </div>
                <div className="text-xs text-gray-400">Score</div>
                <div className={`text-xs mt-1 ${
                  performanceMetrics.score >= 90 ? 'text-green-400' : 
                  performanceMetrics.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {performanceMetrics.score >= 90 ? '✅ Excelente' : 
                   performanceMetrics.score >= 50 ? '⚠️ Bom' : '❌ Precisa Melhorar'}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Botão Ver Site ao Vivo */}
      <div className="mt-6 text-center">
        <Button
          variant="default"
          size="lg"
          onClick={() => window.open(siteUrl, '_blank', 'noopener,noreferrer')}
          className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Ver Site ao Vivo
        </Button>
      </div>
    </div>
  );
}

