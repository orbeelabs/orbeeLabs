import prisma from "@/lib/prisma";
import {
  createSuccessResponse,
  createErrorResponse,
  withAdmin,
} from "@/lib/api";
import { Logger } from "@/lib/logger";

async function handleGetStats() {
  try {
    const [
      total,
      byStatus,
      last30Days,
      last7Days,
      thisMonth,
      lastMonth,
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.groupBy({
        by: ['status'],
        _count: { id: true },
      }),
      prisma.contact.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.contact.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.contact.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      prisma.contact.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ]);

    const statusMap: Record<string, number> = {};
    byStatus.forEach((item) => {
      statusMap[item.status] = item._count.id;
    });

    const newCount = statusMap['NEW'] || 0;
    const contactedCount = statusMap['CONTACTED'] || 0;
    const qualifiedCount = statusMap['QUALIFIED'] || 0;
    const convertedCount = statusMap['CONVERTED'] || 0;
    const lostCount = statusMap['LOST'] || 0;

    const conversionRate = total > 0 ? ((convertedCount / total) * 100).toFixed(1) : '0';
    const qualificationRate = total > 0 ? (((qualifiedCount + convertedCount) / total) * 100).toFixed(1) : '0';

    return createSuccessResponse({
      total,
      byStatus: {
        NEW: newCount,
        CONTACTED: contactedCount,
        QUALIFIED: qualifiedCount,
        CONVERTED: convertedCount,
        LOST: lostCount,
      },
      conversionRate: parseFloat(conversionRate),
      qualificationRate: parseFloat(qualificationRate),
      last7Days,
      last30Days,
      thisMonth,
      lastMonth,
      monthOverMonth: lastMonth > 0
        ? parseFloat((((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1))
        : thisMonth > 0 ? 100 : 0,
    }, "Estatísticas recuperadas com sucesso");
  } catch (error) {
    Logger.error("Erro ao buscar estatísticas", {
      endpoint: '/api/admin/contacts/stats',
      method: 'GET',
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

export const GET = withAdmin(handleGetStats);
