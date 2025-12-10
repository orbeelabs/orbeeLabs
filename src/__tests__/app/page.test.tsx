import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock do framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileInView, initial, animate, ...restProps } = props as React.HTMLAttributes<HTMLDivElement> & { whileInView?: unknown; initial?: unknown; animate?: unknown };
      return <div {...restProps}>{children}</div>;
    },
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileInView, initial, animate, ...restProps } = props as React.HTMLAttributes<HTMLHeadingElement> & { whileInView?: unknown; initial?: unknown; animate?: unknown };
      return <h1 {...restProps}>{children}</h1>;
    },
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileInView, initial, animate, ...restProps } = props as React.HTMLAttributes<HTMLHeadingElement> & { whileInView?: unknown; initial?: unknown; animate?: unknown };
      return <h2 {...restProps}>{children}</h2>;
    },
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileInView, initial, animate, ...restProps } = props as React.HTMLAttributes<HTMLParagraphElement> & { whileInView?: unknown; initial?: unknown; animate?: unknown };
      return <p {...restProps}>{children}</p>;
    },
  },
}));

// Mock dos componentes de animação
jest.mock('@/components/animations/ParticleFieldCanvas', () => ({
  __esModule: true,
  default: () => <div data-testid="particle-field">ParticleFieldCanvas</div>,
}));

jest.mock('@/components/animations/FadeInUp', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/animations/AnimatedCard', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/animations/StaggerContainer', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/animations/StaggerItem', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/animations/ScrollIndicator', () => ({
  __esModule: true,
  default: () => <div data-testid="scroll-indicator">ScrollIndicator</div>,
}));

// Mock do PageLayout
jest.mock('@/components/layout', () => ({
  PageLayout: ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>,
  ContentSection: ({ children }: { children: React.ReactNode }) => <section>{children}</section>,
  CTASection: ({ children }: { children: React.ReactNode }) => <section>{children}</section>,
}));

// Mock do Next.js Link
jest.mock('next/link', () => {
  const LinkComponent = ({ children, href }: { children: React.ReactNode; href: string }) => 
    React.createElement('a', { href }, children);
  LinkComponent.displayName = 'Link';
  return LinkComponent;
});

describe('Home Page', () => {
  it('deve renderizar a página corretamente', () => {
    render(<Home />);
    
    // Verificar que a página renderizou
    const pageLayout = screen.getByTestId('page-layout');
    expect(pageLayout).toBeInTheDocument();
    
    // Verificar elementos principais (pode haver múltiplos)
    expect(screen.getAllByText(/orbee labs/i).length).toBeGreaterThan(0);
  });

  it('deve renderizar componentes de animação', () => {
    render(<Home />);
    
    // Verificar que componentes de animação estão presentes
    expect(screen.getByTestId('particle-field')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-indicator')).toBeInTheDocument();
  });

  it('deve ter links funcionais para contato e portfolio', () => {
    render(<Home />);
    
    // Buscar links por href, não por texto (mais flexível)
    const links = screen.getAllByRole('link');
    const contatoLink = links.find(link => link.getAttribute('href') === '/contato');
    const portfolioLink = links.find(link => link.getAttribute('href') === '/portfolio');
    
    expect(contatoLink).toBeInTheDocument();
    expect(portfolioLink).toBeInTheDocument();
  });
});

