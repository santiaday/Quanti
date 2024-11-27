// src/services/eventService.ts
import EventModel from '@models/events/eventModel';
import { IBaseEvent } from '@backendTypes/events/event';

export const saveEvent = async (eventData: IBaseEvent): Promise<IBaseEvent> => {
  const Event = EventModel.discriminators?.[eventData.eventType] || EventModel;
  console.log(Event)
  const event = new Event(eventData);
  return await event.save();
};

export const getEvents = async (
  filter: Record<string, any> = {}
): Promise<IBaseEvent[]> => {
  return await EventModel.find(filter).sort({ timestamp: -1 }).exec();
};
