// src/models/customEventModel.ts
import { Schema } from 'mongoose';
import EventModel from '../eventModel';
import { ICustomEvent } from '../../../types/events/custom/customEvent';

const CustomEventSchema = new Schema<ICustomEvent>({
  eventName: { type: String, required: true },
  properties: { type: Schema.Types.Mixed },
});

const CustomEventModel = EventModel.discriminator<ICustomEvent>(
  'CustomEvent',
  CustomEventSchema
);

export default CustomEventModel;
