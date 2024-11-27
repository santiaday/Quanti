"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/eventRoutes.ts
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../../controllers/events/eventController");
const router = express_1.default.Router();
router.post('/events', eventController_1.createEvent);
router.get('/events', eventController_1.listEvents);
exports.default = router;
