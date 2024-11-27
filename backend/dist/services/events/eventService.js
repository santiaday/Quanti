"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.saveEvent = void 0;
// src/services/eventService.ts
const eventModel_1 = __importDefault(require("@models/events/eventModel"));
const saveEvent = async (eventData) => {
    var _a;
    const Event = ((_a = eventModel_1.default.discriminators) === null || _a === void 0 ? void 0 : _a[eventData.eventType]) || eventModel_1.default;
    const event = new Event(eventData);
    return await event.save();
};
exports.saveEvent = saveEvent;
const getEvents = async (filter = {}) => {
    return await eventModel_1.default.find(filter).sort({ timestamp: -1 }).exec();
};
exports.getEvents = getEvents;
