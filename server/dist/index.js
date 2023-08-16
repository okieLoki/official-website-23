"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const teamRoute_1 = require("./routes/teamRoute");
const eventRoute_1 = require("./routes/eventRoute");
const app = (0, express_1.default)();
// db connection
(0, dbConfig_1.default)();
// middleware
const corsOptions = {
    origin: process.env.CLIENT_URL
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// routes
app.use('/api/team', teamRoute_1.teamRoute);
app.use('/api/event', eventRoute_1.eventRoute);
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
