"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listEvents = exports.createEvent = void 0;
const eventService_1 = require("../../services/events/eventService");
const createEvent = async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip,
            timestamp: new Date(),
        };
        const event = await (0, eventService_1.saveEvent)(eventData);
        res.status(201).json(event);
    }
    catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createEvent = createEvent;
const listEvents = async (req, res) => {
    try {
        const filter = req.query || {};
        const events = await (0, eventService_1.getEvents)(filter);
        res.status(200).json(events);
    }
    catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.listEvents = listEvents;
