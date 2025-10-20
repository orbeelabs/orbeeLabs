// Sistema de Logging Centralizado
// Facilita monitoramento e debugging

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

export interface LogContext {
  userId?: string;
  requestId?: string;
  endpoint?: string;
  method?: string;
  userAgent?: string;
  ip?: string;
  operation?: string;
  table?: string;
  contactId?: string;
  subscriberId?: string;
  auditId?: string;
  message?: string;
}

export class Logger {
  private static formatMessage(level: LogLevel, message: string, context?: LogContext, error?: Error): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` [${JSON.stringify(context)}]` : '';
    const errorStr = error ? `\nError: ${error.message}\nStack: ${error.stack}` : '';
    
    return `[${timestamp}] ${level.toUpperCase()}${contextStr}: ${message}${errorStr}`;
  }

  static error(message: string, context?: LogContext, error?: Error): void {
    const formattedMessage = this.formatMessage(LogLevel.ERROR, message, context, error);
    console.error(formattedMessage);
    
    // Em produção, enviar para serviço de monitoramento
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrar com Sentry, DataDog, ou outro serviço
      // Sentry.captureException(error || new Error(message), { extra: context });
    }
  }

  static warn(message: string, context?: LogContext): void {
    const formattedMessage = this.formatMessage(LogLevel.WARN, message, context);
    console.warn(formattedMessage);
  }

  static info(message: string, context?: LogContext): void {
    const formattedMessage = this.formatMessage(LogLevel.INFO, message, context);
    console.log(formattedMessage);
  }

  static debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV === 'development') {
      const formattedMessage = this.formatMessage(LogLevel.DEBUG, message, context);
      console.debug(formattedMessage);
    }
  }
}

// Funções utilitárias para casos comuns
export function logApiError(error: Error, endpoint: string, method: string, context?: Partial<LogContext>): void {
  Logger.error(`API Error in ${method} ${endpoint}`, {
    endpoint,
    method,
    ...context
  }, error);
}

export function logApiSuccess(endpoint: string, method: string, context?: Partial<LogContext>): void {
  Logger.info(`API Success: ${method} ${endpoint}`, {
    endpoint,
    method,
    ...context
  });
}

export function logDatabaseError(error: Error, operation: string, table?: string): void {
  Logger.error(`Database Error in ${operation}${table ? ` on ${table}` : ''}`, {
    operation,
    table
  }, error);
}

export function logAuthEvent(event: string, userId?: string, context?: Partial<LogContext>): void {
  Logger.info(`Auth Event: ${event}`, {
    userId,
    ...context
  });
}
