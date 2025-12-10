// Barrel Exports Centralizados - Boas Práticas
// Evita imports duplicados e facilita manutenção

// UI Components
export { Button } from '@/components/ui/button';
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
export { Input } from '@/components/ui/input';
export { Label } from '@/components/ui/label';
export { useToast } from '@/components/ui/use-toast';
export { default as CircularIcon } from '@/components/ui/CircularIcon';

// Layout Components
export { PageLayout, HeroSection, ContentSection, CTASection, BreadcrumbWrapper, GradientSection } from '@/components/layout';

// Form Components
export { FormField, FormInput, FormSelect, FormTextarea, FormSubmitButton, FormBenefits } from '@/components/forms/fields';
export { default as ContactForm } from '@/components/forms/ContactForm';

// Animation Components
export { default as FadeInUp } from '@/components/animations/FadeInUp';
export { default as AnimatedCard } from '@/components/animations/AnimatedCard';
export { default as StaggerContainer } from '@/components/animations/StaggerContainer';
export { default as StaggerItem } from '@/components/animations/StaggerItem';
export { default as ParticleField } from '@/components/animations/ParticleFieldCanvas';
export { default as ScrollIndicator } from '@/components/animations/ScrollIndicator';

// Core Components
export { default as Navigation } from '@/components/Navigation';
export { default as Footer } from '@/components/Footer';
export { default as CookieBanner } from '@/components/CookieBanner';
export { default as GoogleTagManager } from '@/components/GoogleTagManager';
export { default as GoogleTagManagerHead } from '@/components/GoogleTagManagerHead';
export { default as SEOImage } from '@/components/SEOImage';
export { default as StructuredData } from '@/components/StructuredData';
export { default as WebVitals } from '@/components/WebVitals';

// Hooks
export * from '@/hooks';

// Logger
export { Logger, logApiError, logApiSuccess, logDatabaseError, logAuthEvent } from './logger';
export * from '@/lib/api';
export * from '@/lib/form-validation';

// Lazy Loading
export * from '@/lib/lazy-loading';

// Framer Motion - Import centralizado
export { motion } from 'framer-motion';

// Next.js
export { default as Link } from 'next/link';
export { default as Image } from 'next/image';

// React
export { useState, useEffect, useCallback, useMemo, useRef } from 'react';
