// src/models/eventModel.ts
import { Schema, model, Document, Model } from 'mongoose';
import { IBaseEvent } from '../../types/events/event';

interface IEventDocument extends IBaseEvent, Document {}

const baseOptions = {
  discriminatorKey: 'eventType',
  collection: 'events',
  timestamps: true,
  versionKey: false,
};

const BaseEventSchema = new Schema<IEventDocument>(
  {
    eventType: { type: String, required: true },
    uniqueId: { type: String },
    sessionId: { type: String },
    userAgent: { type: String },
    ipAddress: { type: String },
    eventName: { type: String },
    currentUrl: { type: String },
    properties: { type: Schema.Types.Mixed }, 
  },
  baseOptions
);

const EventModel = model<IEventDocument>('Event', BaseEventSchema);

export default EventModel;
