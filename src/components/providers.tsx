'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { useState } from 'react';
import PostHogProvider from '@/components/PostHogProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
        retry: 3,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <SessionProvider>
      <PostHogProvider>
        <QueryClientProvider client={queryClient}>
          <LazyMotion features={domAnimation}>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </LazyMotion>
        </QueryClientProvider>
      </PostHogProvider>
    </SessionProvider>
  );
}
