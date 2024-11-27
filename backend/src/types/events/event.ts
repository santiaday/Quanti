export interface IBaseEvent {
  eventType: string;
  uniqueId?: string;
  sessionId?: string;
  userAgent?: string;
  ipAddress?: string;
  eventName?: string;
  currentUrl?: string;
  email?: string;
  phoneNumber?: string;
  properties?: { [key: string]: any }; 
}