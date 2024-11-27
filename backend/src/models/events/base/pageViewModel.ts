// src/models/pageViewModel.ts
import { Schema } from 'mongoose';
import EventModel from '../eventModel';
import { IPageViewEvent } from '../../../types/events/base/pageview';

const PageViewSchema = new Schema<IPageViewEvent>({
  url: { type: String, required: true },
  referrer: { type: String },
});

const PageViewModel = EventModel.discriminator<IPageViewEvent>(
  'PageView',
  PageViewSchema
);

export default PageViewModel;
