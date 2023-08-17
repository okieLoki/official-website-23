"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.getProjects = exports.addProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const addProject = async (req, res) => {
    try {
        const { name, image, project_lead, github_link, description, members } = req.body;
        if (!name || !image || !project_lead || !github_link || !description || !members) {
            return res.status(400).json({
                message: "Please fill out all fields"
            });
        }
        const project = Project_1.default.create({
            ...req.body
        });
        return res.status(201).json({
            message: "Project created successfully",
            project
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
exports.addProject = addProject;
const getProjects = async (req, res) => {
    try {
        const projects = await Project_1.default.find();
        return res.status(200).json({
            projects
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
exports.getProjects = getProjects;
const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Project deleted successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
exports.deleteProject = deleteProject;
