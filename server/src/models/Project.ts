import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: String,
})

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    project_lead: {
        type: String,
        required: true
    },
    github_link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    members: {
        type: [memberSchema],
    }
})

const Project = mongoose.model("Project", projectSchema);

export default Project;