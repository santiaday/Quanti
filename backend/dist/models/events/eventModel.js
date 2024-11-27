"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/eventModel.ts
const mongoose_1 = require("mongoose");
const baseOptions = {
    discriminatorKey: 'eventType', // Model differentiator
    collection: 'events',
    timestamps: true,
    versionKey: false,
};
const BaseEventSchema = new mongoose_1.Schema({
    eventType: { type: String, required: true },
    userId: { type: String },
    sessionId: { type: String },
    userAgent: { type: String },
    ipAddress: { type: String },
}, baseOptions);
const EventModel = (0, mongoose_1.model)('Event', BaseEventSchema);
exports.default = EventModel;
