"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./utils/db"));
const eventRoutes_1 = __importDefault(require("./routes/events/eventRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
require("tsconfig-paths/register");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api', eventRoutes_1.default);
// Serve static files (e.g., tracker.js)
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '../public')));
// Start Server
const PORT = process.env.PORT || 5000;
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
