/**
 * Logger seguro para client-side
 * Não expõe dados sensíveis e remove logs em produção
 */

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

interface LogContext {
  [key: string]: string | number | boolean | undefined;
}

class ClientLoggerClass {
  private get isDevelopment(): boolean {
    if (typeof window === 'undefined') return false;
    return process.env.NODE_ENV === 'development';
  }

  private sanitizeContext(context?: LogContext): LogContext | undefined {
    if (!context) return undefined;

    const sanitized: LogContext = {};
    const sensitiveKeys = ['password', 'token', 'secret', 'apiKey', 'email', 'phone', 'cpf', 'cnpj'];

    for (const [key, value] of Object.entries(context)) {
      const keyLower = key.toLowerCase();
      const isSensitive = sensitiveKeys.some(sk => keyLower.includes(sk));
      
      if (isSensitive) {
        sanitized[key] = '***REDACTED***';
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext, error?: Error): string {
    const timestamp = new Date().toISOString();
    const sanitizedContext = this.sanitizeContext(context);
    const contextStr = sanitizedContext ? ` [${JSON.stringify(sanitizedContext)}]` : '';
    
    // Em produção, não expor stack traces
    const errorStr = error 
      ? this.isDevelopment
        ? `\nError: ${error.message}\nStack: ${error.stack}`
        : `\nError: ${error.message}`
      : '';
    
    return `[${timestamp}] ${level.toUpperCase()}${contextStr}: ${message}${errorStr}`;
  }

  error(message: string, context?: LogContext, error?: Error): void {
    if (!this.isDevelopment) {
      // Em produção, apenas enviar para serviço de monitoramento (Sentry, etc)
      // TODO: Integrar com Sentry
      return;
    }
    
    const formattedMessage = this.formatMessage(LogLevel.ERROR, message, context, error);
    console.error(formattedMessage);
  }

  warn(message: string, context?: LogContext): void {
    if (!this.isDevelopment) return;
    
    const formattedMessage = this.formatMessage(LogLevel.WARN, message, context);
    console.warn(formattedMessage);
  }

  info(message: string, context?: LogContext): void {
    if (!this.isDevelopment) return;
    
    const formattedMessage = this.formatMessage(LogLevel.INFO, message, context);
    console.log(formattedMessage);
  }

  debug(message: string, context?: LogContext): void {
    if (!this.isDevelopment) return;
    
    const formattedMessage = this.formatMessage(LogLevel.DEBUG, message, context);
    console.debug(formattedMessage);
  }
}

export const ClientLogger = new ClientLoggerClass();

