/**
 * Tipos para CMS
 */

export interface CMSFilters {
  category?: string;
  tag?: string;
  search?: string;
  published?: boolean;
  featured?: boolean;
  industry?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
