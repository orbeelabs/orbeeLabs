import Image from 'next/image';

interface SEOImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export default function SEOImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  quality = 90,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: SEOImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      sizes={sizes}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  );
}

// Componente específico para imagens de serviços
export function ServiceImage({ 
  service, 
  className = '' 
}: { 
  service: string; 
  className?: string; 
}) {
  const getServiceImage = (serviceName: string) => {
    const images = {
      'SEO Técnico Avançado': '/images/seo-tecnico.jpg',
      'Desenvolvimento Web Fullstack': '/images/desenvolvimento-web.jpg',
      'Marketing Digital de Alta Performance': '/images/marketing-digital.jpg',
    };
    return images[serviceName as keyof typeof images] || '/images/default-service.jpg';
  };

  const getServiceAlt = (serviceName: string) => {
    const altTexts = {
      'SEO Técnico Avançado': 'SEO técnico avançado - Auditoria completa, otimização on-page e estratégias de conteúdo para dominar o Google',
      'Desenvolvimento Web Fullstack': 'Desenvolvimento web fullstack com React, Next.js e Python - Sites otimizados e máquinas de conversão',
      'Marketing Digital de Alta Performance': 'Marketing digital de alta performance - Estratégias data-driven para ROI mensurável e crescimento sustentável',
    };
    return altTexts[serviceName as keyof typeof altTexts] || `Imagem ilustrativa do serviço ${serviceName} - Orbee Labs`;
  };

  return (
    <SEOImage
      src={getServiceImage(service)}
      alt={getServiceAlt(service)}
      width={400}
      height={300}
      className={className}
    />
  );
}

// Componente para imagens de portfolio
export function PortfolioImage({ 
  project, 
  className = '' 
}: { 
  project: string; 
  className?: string; 
}) {
  return (
    <SEOImage
      src={`/images/portfolio/${project.toLowerCase().replace(/\s+/g, '-')}.jpg`}
      alt={`Projeto ${project} - Case de sucesso Orbee Labs em desenvolvimento web e marketing digital`}
      width={600}
      height={400}
      className={className}
    />
  );
}

// Componente para imagens de depoimentos
export function TestimonialImage({ 
  name, 
  className = '' 
}: { 
  name: string; 
  className?: string; 
}) {
  return (
    <SEOImage
      src={`/images/testimonials/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
      alt={`Depoimento de ${name} sobre os serviços de marketing digital e desenvolvimento web da Orbee Labs`}
      width={100}
      height={100}
      className={`rounded-full ${className}`}
    />
  );
}
