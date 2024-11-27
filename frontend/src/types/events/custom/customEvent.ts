import { IBaseEvent } from '../event';

export interface ICustomEvent extends IBaseEvent {
  eventName: string;
  properties?: Record<string, any>;
}
