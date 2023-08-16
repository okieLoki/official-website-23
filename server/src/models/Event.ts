import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
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
    topics: [String],
    info: {
        type: String,
        required: true
    }
})

const Event = mongoose.model('Event', eventSchema);

export default Event;