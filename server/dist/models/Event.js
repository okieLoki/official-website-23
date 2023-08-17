"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    end_date: {
        type: Date,
    },
    end_time: {
        type: String,
    },
    link: {
        type: String,
        required: true
    },
    topics: [String],
    info: {
        type: String,
        required: true
    }
});
const Event = mongoose_1.default.model('Event', eventSchema);
exports.default = Event;
