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
    alternateName: 'Orbee Labs — Marketing Digital e Desenvolvimento Web',
    description: 'Agência de marketing digital, SEO técnico e desenvolvimento web Fullstack em Belo Horizonte. Metodologia proprietária SEO-VX para resultados 3x mais rápidos.',
    url: 'https://orbeelabs.com',
    logo: 'https://orbeelabs.com/images/logo/logo_branca.webp',
    image: 'https://orbeelabs.com/opengraph-image',
    telephone: '+55-31-98255-6751',
    email: 'contato@orbeelabs.com',
    founders: [
      { '@type': 'Person', name: 'Diana Caldeira', jobTitle: 'Head of Technology & Innovation' },
      { '@type': 'Person', name: 'Izabela Fissicaro', jobTitle: 'Head of Creative & Brand Strategy' },
      { '@type': 'Person', name: 'Gabi Cipriano', jobTitle: 'Head of Technical Strategy & Business' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Costa Senna, 597',
      addressLocality: 'Belo Horizonte',
      addressRegion: 'MG',
      postalCode: '30720-350',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -19.9167,
      longitude: -43.9345,
    },
    sameAs: [
      'https://www.instagram.com/orbeelabs',
      'https://github.com/orbeelabs',
    ],
    foundingDate: '2024',
    numberOfEmployees: '5-10',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -19.9167,
        longitude: -43.9345,
      },
      geoRadius: '50000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Marketing Digital',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Técnico e SEO Arquitetural',
            description: 'Otimização técnica para motores de busca com metodologia proprietária SEO-VX. Sites construídos PARA o SEO desde a primeira linha de código.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Desenvolvimento Web Fullstack',
            description: 'Desenvolvimento de sites e aplicações web com React, Next.js e Python. Performance 98+ no PageSpeed.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marketing Digital de Alta Performance',
            description: 'Estratégias data-driven de marketing digital com ROI mensurável. Tráfego pago, redes sociais e conteúdo.',
          },
        },
      ],
    },
  };

  return <StructuredData type="Organization" data={organizationData} />;
}

// Componente para dados de negócio local (SEO Local BH)
export function LocalBusinessStructuredData() {
  const localBusinessData = {
    '@id': 'https://orbeelabs.com/#localbusiness',
    name: 'Orbee Labs',
    description: 'Agência de marketing digital, SEO técnico e desenvolvimento web em Belo Horizonte. Metodologia proprietária SEO-VX.',
    url: 'https://orbeelabs.com',
    telephone: '+55-31-98255-6751',
    email: 'contato@orbeelabs.com',
    image: 'https://orbeelabs.com/opengraph-image',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Costa Senna, 597',
      addressLocality: 'Belo Horizonte',
      addressRegion: 'MG',
      postalCode: '30720-350',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -19.9167,
      longitude: -43.9345,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -19.9167,
        longitude: -43.9345,
      },
      geoRadius: '50000',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      'https://www.instagram.com/orbeelabs',
      'https://github.com/orbeelabs',
    ],
  };

  return (
    <script
      id="structured-data-localbusiness"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', ...localBusinessData }),
      }}
    />
  );
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
        url: 'https://orbeelabs.com/images/logo/logo_branca.webp',
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
