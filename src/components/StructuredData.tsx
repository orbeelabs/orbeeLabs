import Script from 'next/script';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Service' | 'BreadcrumbList' | 'FAQPage';
  data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };

    return JSON.stringify(baseData);
  };

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: getStructuredData(),
      }}
    />
  );
}

// Componente específico para dados da organização
export function OrganizationStructuredData() {
  const organizationData = {
    name: 'Orbee Labs',
    description: 'Agência de marketing digital e desenvolvimento web especializada em SEO técnico e estratégias de alta performance.',
    url: 'https://orbeelabs.com',
    logo: 'https://orbeelabs.com/logo.png',
    image: 'https://orbeelabs.com/og-image.jpg',
    telephone: '+55-31-98255-6751',
    email: 'contato@orbeelabs.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'São Paulo',
      addressLocality: 'São Paulo',
    },
    sameAs: [
      'https://www.instagram.com/orbeelabs',
      'https://www.facebook.com/orbeelabs',
    ],
    foundingDate: '2024',
    numberOfEmployees: '5-10',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -23.5505,
        longitude: -46.6333,
      },
      geoRadius: '1000000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Marketing Digital',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Técnico',
            description: 'Otimização técnica para motores de busca com metodologia proprietária "SEO Cabuloso"',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Desenvolvimento Web Fullstack',
            description: 'Desenvolvimento de sites e aplicações web com React, Next.js e Python',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marketing Digital de Alta Performance',
            description: 'Estratégias data-driven para Líderes Digitais Ambiciosos',
          },
        },
      ],
    },
  };

  return <StructuredData type="Organization" data={organizationData} />;
}

// Componente para dados do website
export function WebsiteStructuredData() {
  const websiteData = {
    name: 'Orbee Labs',
    description: 'Marketing Digital e Desenvolvimento Web para resultados reais e mensuráveis',
    url: 'https://orbeelabs.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://orbeelabs.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Orbee Labs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://orbeelabs.com/logo.png',
      },
    },
  };

  return <StructuredData type="WebSite" data={websiteData} />;
}

// Componente para breadcrumbs
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbData = {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData type="BreadcrumbList" data={breadcrumbData} />;
}

// Componente para FAQ
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const faqData = {
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <StructuredData type="FAQPage" data={faqData} />;
}
