'use client';

import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const GTM_ID = 'GTM-XXXXXXX'; // SUBSTITUA PELO SEU GTM ID

export default function GTM() {
  useEffect(() => {
    // A inicialização do GTM agora ocorre aqui,
    // garantindo que ela é executada apenas no lado do cliente
    // após o componente ser montado.
    TagManager.initialize({ gtmId: GTM_ID });
    
    // Opcional: enviar um evento de pageview inicial se o GTM não fizer isso automaticamente
    // window.dataLayer.push({
    //   event: 'pageview',
    //   pagePath: window.location.pathname,
    //   pageTitle: document.title,
    // });
  }, []); // O array de dependências vazio garante que este efeito roda apenas uma vez no mount

  return null;
}

