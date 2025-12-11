'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Logger } from '@/lib/logger';

function ConfirmarCorrecaoContent() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "LGPD", url: "https://orbeelabs.com/lgpd" },
    { name: "Confirmar Correção", url: "https://orbeelabs.com/lgpd/confirmar-correcao" },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Token inválido ou ausente');
      return;
    }

    // Confirmar correção
    fetch(`/api/lgpd/update?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
          setMessage('Seus dados foram corrigidos com sucesso!');
        } else {
          setStatus('error');
          setMessage(data.error || 'Erro ao confirmar correção');
        }
      })
      .catch((error) => {
        setStatus('error');
        setMessage('Erro ao processar solicitação');
        Logger.error('Erro ao confirmar correção LGPD', {
          endpoint: '/api/lgpd/update',
        }, error as Error);
      });
  }, [searchParams]);

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <section className="relative py-20 bg-gradient-to-br from-background via-card to-background min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass glass-hover rounded-2xl p-8 md:p-12 text-center"
          >
            {status === 'loading' && (
              <>
                <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
                <h1 className="text-3xl font-bold text-white mb-4">
                  Processando...
                </h1>
                <p className="text-gray-300">
                  Confirmando correção de dados...
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
                <h1 className="text-3xl font-bold text-white mb-4">
                  Correção Confirmada
                </h1>
                <p className="text-gray-300 mb-6">
                  {message}
                </p>
                <p className="text-sm text-gray-400 mb-8">
                  Um email de confirmação foi enviado para você.
                </p>
                <Button
                  onClick={() => router.push('/')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Voltar ao Início
                </Button>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="w-16 h-16 mx-auto mb-6 text-red-500" />
                <h1 className="text-3xl font-bold text-white mb-4">
                  Erro na Correção
                </h1>
                <p className="text-gray-300 mb-6">
                  {message}
                </p>
                <p className="text-sm text-gray-400 mb-8">
                  O token pode ter expirado ou ser inválido. Por favor, solicite uma nova correção.
                </p>
                <Button
                  onClick={() => router.push('/privacidade')}
                  variant="outline"
                >
                  Ver Política de Privacidade
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}

export default function ConfirmarCorrecaoPage() {
  return (
    <Suspense
      fallback={
        <PageLayout>
          <section className="relative py-20 bg-gradient-to-br from-background via-card to-background min-h-screen flex items-center">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass glass-hover rounded-2xl p-8 md:p-12 text-center">
                <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
                <h1 className="text-3xl font-bold text-white mb-4">
                  Carregando...
                </h1>
              </div>
            </div>
          </section>
        </PageLayout>
      }
    >
      <ConfirmarCorrecaoContent />
    </Suspense>
  );
}

