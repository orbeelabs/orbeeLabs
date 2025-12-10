'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

export default function WebVitals() {
  useEffect(() => {
    // Função para enviar métricas para o Google Analytics ou outro serviço
    function sendToAnalytics(metric: { name: string; value: number; id: string }) {
      // Aqui você pode enviar as métricas para o seu serviço de analytics
      console.log('Web Vital:', metric);
      
      // Exemplo de envio para Google Analytics via gtag
      // if (typeof window !== 'undefined' && window.gtag) {
      //   window.gtag('event', metric.name, {
      //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      //     event_label: metric.id,
      //     non_interaction: true,
      //   });
      // }
    }

    // Registrar todas as métricas de Core Web Vitals
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);

  return null;
}
