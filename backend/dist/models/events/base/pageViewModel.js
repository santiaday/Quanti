"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/pageViewModel.ts
const mongoose_1 = require("mongoose");
const eventModel_1 = __importDefault(require("../eventModel"));
const PageViewSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    referrer: { type: String },
});
const PageViewModel = eventModel_1.default.discriminator('PageView', PageViewSchema);
exports.default = PageViewModel;
