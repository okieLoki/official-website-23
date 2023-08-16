"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.getEvents = exports.addEvent = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const addEvent = async (req, res) => {
    try {
        const { title, image, venue, date, time, end_date, end_time, topics, info } = req.body;
        // Check if mandatory fields are present
        if (!title || !image || !venue || !date || !time || !info) {
            return res.status(400).json({
                message: 'Mandatory fields are missing'
            });
        }
        const event = await Event_1.default.create({ ...req.body });
        return res.status(201).json({
            message: 'Event added',
            data: event
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
};
exports.addEvent = addEvent;
const getEvents = async (req, res) => {
    try {
        const events = await Event_1.default.find({});
        return res.status(200).json({
            events
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
};
exports.getEvents = getEvents;
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event_1.default.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }
        return res.status(200).json({
            message: 'Event deleted'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
};
exports.deleteEvent = deleteEvent;
