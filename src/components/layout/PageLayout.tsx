'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BreadcrumbStructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbWrapper from './BreadcrumbWrapper';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbItems?: Array<{ name: string; url: string }>;
  className?: string;
}

export default function PageLayout({ 
  children, 
  breadcrumbItems,
  className = ""
}: PageLayoutProps) {
  return (
    <>
      {breadcrumbItems && <BreadcrumbStructuredData items={breadcrumbItems} />}
      <Navigation />
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <BreadcrumbWrapper>
          <Breadcrumb items={breadcrumbItems} />
        </BreadcrumbWrapper>
      )}
      <div className={`min-h-screen bg-background text-foreground ${className}`}>
        {children}
      </div>
      <Footer />
    </>
  );
}
