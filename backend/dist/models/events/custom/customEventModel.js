"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/customEventModel.ts
const mongoose_1 = require("mongoose");
const eventModel_1 = __importDefault(require("../eventModel"));
const CustomEventSchema = new mongoose_1.Schema({
    eventName: { type: String, required: true },
    properties: { type: mongoose_1.Schema.Types.Mixed },
});
const CustomEventModel = eventModel_1.default.discriminator('CustomEvent', CustomEventSchema);
exports.default = CustomEventModel;
