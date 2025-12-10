import { NextRequest, NextResponse } from 'next/server';
import { createCalendarEvent, getAvailableTimeSlots } from '@/lib/google-calendar';
import { Logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { summary, description, startTime, endTime, attendeeEmail, attendeeName } = body;

    if (!summary || !startTime || !endTime || !attendeeEmail || !attendeeName) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    const result = await createCalendarEvent({
      summary,
      description: description || 'Consulta agendada via site Orbee Labs',
      startTime,
      endTime,
      attendeeEmail,
      attendeeName,
    });

    return NextResponse.json(result);
  } catch (error) {
    Logger.error('Erro ao criar evento no calendário', {
      endpoint: '/api/calendar/events',
      method: 'POST',
    }, error as Error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao criar evento no calendário' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Data não fornecida' },
        { status: 400 }
      );
    }

    const slots = await getAvailableTimeSlots(date);
    return NextResponse.json({ slots });
  } catch (error) {
    Logger.error('Erro ao buscar horários disponíveis', {
      endpoint: '/api/calendar/events',
      method: 'GET',
    }, error as Error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao buscar horários disponíveis' },
      { status: 500 }
    );
  }
}

