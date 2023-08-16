"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoute = void 0;
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
exports.eventRoute = router;
router.post('/', eventController_1.addEvent);
router.get('/', eventController_1.getEvents);
router.delete('/:id', eventController_1.deleteEvent);
