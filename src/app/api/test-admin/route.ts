import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log('🔍 Testando API admin...');
    
    const contactsCount = await prisma.contact.count();
    const newsletterCount = await prisma.newsletter.count();
    const auditsCount = await prisma.audit.count();
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
