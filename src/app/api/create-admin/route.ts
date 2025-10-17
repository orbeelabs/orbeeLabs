import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Criando usuário admin via API...');
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: 'ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required' },
        { status: 400 }
      );
    }
    
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Senha configurada:', adminPassword ? 'Sim' : 'Não');
    
    const hashedPassword = await hash(adminPassword, 10);
    
    const user = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
      },
      create: {
        name: 'Admin Orbee Labs',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    
    console.log('✅ Usuário admin criado/atualizado com sucesso!');
    console.log('👤 ID:', user.id);
    console.log('📧 Email:', user.email);
    console.log('🔑 Role:', user.role);
    
    return NextResponse.json({
      success: true,
      message: 'Usuário admin criado/atualizado com sucesso!',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
