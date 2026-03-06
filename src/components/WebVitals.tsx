'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { ClientLogger } from '@/lib/logger-client';

export default function WebVitals() {
  useEffect(() => {
    function sendToAnalytics(metric: { name: string; value: number; id: string }) {
      // Enviar para GTM dataLayer
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as { dataLayer?: Array<Record<string, unknown>> }).dataLayer?.push({
          event: 'web_vitals',
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_name: metric.name,
          metric_value: metric.value,
          non_interaction: true,
        });
      }
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
