/**
 * Utilitário para mascarar emails em logs
 * Protege dados sensíveis conforme LGPD
 */

export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return '***';
  }

  const [localPart, domain] = email.split('@');
  
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  
  const maskedLocal = `${localPart.substring(0, 2)}***`;
  return `${maskedLocal}@${domain}`;
}

export function maskPhone(phone: string): string {
  if (!phone) return '***';
  
  // Manter apenas últimos 2 dígitos
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length <= 2) {
    return '***';
  }
  
  return `***${cleaned.slice(-2)}`;
}

export function maskName(name: string): string {
  if (!name) return '***';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return `${parts[0].charAt(0)}***`;
  }
  
  // Mostrar primeiro nome e último sobrenome mascarado
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}***`;
}

