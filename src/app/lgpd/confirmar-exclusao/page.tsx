'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Logger } from '@/lib/logger';

function ConfirmarExclusaoContent() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "LGPD", url: "https://orbeelabs.com/lgpd" },
    { name: "Confirmar Exclusão", url: "https://orbeelabs.com/lgpd/confirmar-exclusao" },
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

    // Confirmar exclusão
    fetch(`/api/lgpd/delete?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
          setMessage('Seus dados foram excluídos com sucesso!');
        } else {
          setStatus('error');
          setMessage(data.error || 'Erro ao confirmar exclusão');
        }
      })
      .catch((error) => {
        setStatus('error');
        setMessage('Erro ao processar solicitação');
        Logger.error('Erro ao confirmar exclusão LGPD', {
          endpoint: '/api/lgpd/delete',
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
                  Confirmando exclusão de dados...
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
                <h1 className="text-3xl font-bold text-white mb-4">
                  Exclusão Confirmada
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
                  Erro na Exclusão
                </h1>
                <p className="text-gray-300 mb-6">
                  {message}
                </p>
                <p className="text-sm text-gray-400 mb-8">
                  O token pode ter expirado ou ser inválido. Por favor, solicite uma nova exclusão.
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

export default function ConfirmarExclusaoPage() {
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
      <ConfirmarExclusaoContent />
    </Suspense>
  );
}

