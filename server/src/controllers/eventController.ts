import { Request, Response } from "express";
import Event from "../models/Event";

const addEvent = async (req: Request, res: Response) => {

    try {
        const { title, image, venue, date, time, end_date, end_time, link, topics, info } = req.body;

        // Check if mandatory fields are present
        if (!title || !image || !venue || !date || !time || !info || !link) {
            return res.status(400).json({
                message: 'Mandatory fields are missing'
            })
        }

        const event = await Event.create({ ...req.body });

        return res.status(201).json({
            message: 'Event added',
            data: event
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal Server error'
        })
    }
}

const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find({});

        return res.status(200).json({
            events
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal Server error'
        })
    }
}

const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            })
        }

        return res.status(200).json({
            message: 'Event deleted'
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal Server error'
        })
    }
}

export {addEvent, getEvents, deleteEvent}