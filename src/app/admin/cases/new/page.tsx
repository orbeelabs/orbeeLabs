'use client';

// Como a rota /new tem prioridade sobre [id], esta página será acessada.
// Vou fazer esta página renderizar o mesmo componente de edição.
// O componente [id] já trata id undefined como novo caso.

import CaseEditPage from '../[id]/page';

export default function NewCasePage() {
  // O componente CaseEditPage já trata id undefined como novo caso
  // então podemos simplesmente renderizá-lo aqui
  return <CaseEditPage />;
}

