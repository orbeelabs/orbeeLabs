import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log('🔍 Testando API admin...');
    
    const contactsCount = await prisma.contact.count();
    const newsletterCount = await prisma.newsletterSubscriber.count();
    const auditsCount = await prisma.seoAudit.count();
    const roiCount = await prisma.roiCalculation.count();

    return NextResponse.json({
      success: true,
      stats: {
        contacts: contactsCount,
        newsletter: newsletterCount,
        audits: auditsCount,
        roi: roiCount,
      }
    });
  } catch (error) {
    console.error('❌ Erro na API test-admin:', error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
