"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const memberSchema = new mongoose_1.default.Schema({
    name: String,
});
const projectSchema = new mongoose_1.default.Schema({
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
});
const Project = mongoose_1.default.model("Project", projectSchema);
exports.default = Project;
