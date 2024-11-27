export interface IBaseEvent {
    _id: string;
    eventType: string;
    timestamp: string;
    userId?: string;
    sessionId?: string;
    userAgent?: string;
    ipAddress?: string;
    [key: string]: any;
  }
  