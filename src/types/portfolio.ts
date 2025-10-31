/**
 * Tipos compartilhados para Portfolio
 */

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  clientName: string | null;
  industry: string;
  services: string[];
  technologies: string[];
  challenge: string;
  solution: string;
  results: string; // JSON string
  duration: string;
  timeline: string | null;
  learnings: string | null;
  heroImage: string | null;
  gallery: string[];
  gscBefore: string | null;
  gscAfter: string | null;
  ga4Before: string | null;
  ga4After: string | null;
  cwvBefore: string | null;
  cwvAfter: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RelatedCase {
  id: string;
  slug: string;
  title: string;
  description: string;
  clientName: string | null;
  industry: string;
  services: string[];
  technologies: string[];
  duration: string;
  featured: boolean;
  publishedAt: Date;
  heroImage: string | null;
}

