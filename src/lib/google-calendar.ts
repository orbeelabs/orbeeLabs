import { google } from 'googleapis';
import { Logger } from '@/lib/logger';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/google'
);

export const calendar = google.calendar({
  version: 'v3',
  auth: oauth2Client,
});

// Função para obter URL de autorização
export function getAuthUrl(): string {
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  });
}

// Função para trocar código por token
export async function getTokenFromCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

// Função para criar evento no calendário
export async function createCalendarEvent({
  summary,
  description,
  startTime,
  endTime,
  attendeeEmail,
  attendeeName,
}: {
  summary: string;
  description: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  attendeeEmail: string;
  attendeeName: string;
}) {
  // Verificar se há autenticação
  if (!oauth2Client.credentials?.access_token) {
    throw new Error('Autenticação Google necessária. Por favor, autorize o acesso primeiro.');
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'orbeelabs@gmail.com';

  const event = {
    summary,
    description,
    start: {
      dateTime: startTime,
      timeZone: 'America/Sao_Paulo',
    },
    end: {
      dateTime: endTime,
      timeZone: 'America/Sao_Paulo',
    },
    attendees: [
      {
        email: attendeeEmail,
        displayName: attendeeName,
      },
      {
        email: 'orbeelabs@gmail.com',
        organizer: true,
      },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 24 horas antes
        { method: 'popup', minutes: 15 }, // 15 minutos antes
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
      meetLink: response.data.conferenceData?.entryPoints?.[0]?.uri,
    };
  } catch (error) {
    Logger.error('Erro ao criar evento no calendário', {
      operation: 'createCalendarEvent',
    }, error as Error);
    
    // Se o erro for de autenticação, dar mensagem mais clara
    if (error.message?.includes('Invalid Credentials') || error.message?.includes('No access')) {
      throw new Error('Autenticação Google necessária. Por favor, autorize o acesso primeiro acessando /api/auth/google');
    }
    
    throw error;
  }
}

// Função para listar horários disponíveis
export async function getAvailableTimeSlots(date: string) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'orbeelabs@gmail.com';
  
  const startOfDay = new Date(date);
  startOfDay.setHours(9, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(18, 0, 0, 0);

  // Gerar horários padrão (9h às 18h, de hora em hora)
  const defaultSlots = [];
  for (let hour = 9; hour < 18; hour++) {
    const slotStart = new Date(startOfDay);
    slotStart.setHours(hour, 0, 0, 0);
    
    const slotEnd = new Date(startOfDay);
    slotEnd.setHours(hour + 1, 0, 0, 0);

    defaultSlots.push({
      start: slotStart.toISOString(),
      end: slotEnd.toISOString(),
      formatted: `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`,
    });
  }

  // Tentar buscar eventos do Google Calendar se houver autenticação
  try {
    // Verificar se há credenciais configuradas
    if (!oauth2Client.credentials?.access_token) {
      // Se não houver autenticação, retornar horários padrão
      console.log('Sem autenticação Google, retornando horários padrão');
      return defaultSlots;
    }

    const response = await calendar.events.list({
      calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const busySlots = response.data.items?.map((event) => ({
      start: event.start?.dateTime || event.start?.date,
      end: event.end?.dateTime || event.end?.date,
    })) || [];

    // Filtrar horários ocupados
    const availableSlots = defaultSlots.filter((slot) => {
      const slotStart = new Date(slot.start);
      const slotEnd = new Date(slot.end);

      const isBusy = busySlots.some((busy) => {
        if (!busy.start || !busy.end) return false;
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        return (
          (slotStart >= busyStart && slotStart < busyEnd) ||
          (slotEnd > busyStart && slotEnd <= busyEnd) ||
          (slotStart <= busyStart && slotEnd >= busyEnd)
        );
      });

      return !isBusy;
    });

    return availableSlots.length > 0 ? availableSlots : defaultSlots;
  } catch (error) {
    console.error('Erro ao buscar horários do Google Calendar (usando horários padrão):', error);
    // Se der erro, retornar horários padrão
    return defaultSlots;
  }
}

