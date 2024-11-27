// src/types/customEvent.ts
import { IBaseEvent } from '../event';

export interface ICustomEvent extends IBaseEvent {
  eventName: string;
  properties?: { [key: string]: any };
}
