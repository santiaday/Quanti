// src/types/pageViewEvent.ts
import { IBaseEvent } from '../event';

export interface IPageViewEvent extends IBaseEvent {
  url: string;
  referrer?: string;
}
