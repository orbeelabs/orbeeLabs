/// <reference types="@prisma/client" />

declare global {
  namespace PrismaJson {
    // Tipos para dados JSON armazenados como string
    type SeoAuditData = {
      title: string;
      description: string;
      score: number;
      recommendations: string[];
    };

    type RoiCalculationData = {
      currentTraffic: number;
      targetTraffic: number;
      conversionRate: number;
      averageOrderValue: number;
    };

    type RoiCalculationResult = {
      projectedRevenue: number;
      roi: number;
      paybackPeriod: number;
    };
  }
}

export {};


