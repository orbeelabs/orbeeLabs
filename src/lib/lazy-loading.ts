import { lazy } from 'react';

// Lazy Loading para componentes pesados
export const LazyCalculadoraROI = lazy(() => import('@/app/calculadora-roi/page'));
export const LazyAuditoriaSEO = lazy(() => import('@/app/auditoria-seo/page'));
export const LazyPortfolio = lazy(() => import('@/app/portfolio/page'));
export const LazyAdminPanel = lazy(() => import('@/app/admin/page'));

// Lazy Loading para componentes de animação pesados
export const LazyParticleField = lazy(() => import('@/components/animations/ParticleField'));
export const LazyContactForm = lazy(() => import('@/components/forms/ContactForm'));

// Lazy Loading para bibliotecas externas
export const LazyRecharts = lazy(() => import('recharts').then(module => ({
  default: module.ResponsiveContainer
})));
