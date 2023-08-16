"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeamMember = exports.getTeamMembers = exports.addTeamMember = void 0;
const Team_1 = __importDefault(require("../models/Team"));
const addTeamMember = async (req, res) => {
    try {
        const { name, position, email } = req.body;
        // Check for existing entry 
        const existingMember = await Team_1.default.findOne({ email });
        if (existingMember) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }
        // Check if mandatory fields are present
        if (!position || !name || !email) {
            return res.status(400).json({
                message: 'Mandatory fields are missing'
            });
        }
        // check for mentor Position
        if (position === 'mentor' && !req.body.role) {
            return res.status(400).json({
                message: 'Mentor role is missing'
            });
        }
        const member = await Team_1.default.create({ ...req.body });
        return res.status(201).json({
            message: 'Member added',
            data: member
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
};
exports.addTeamMember = addTeamMember;
const getTeamMembers = async (req, res) => {
    try {
        const lead = await Team_1.default.find({ position: 'lead' });
        const coLead = await Team_1.default.find({ position: 'co-lead' });
        const mentor = await Team_1.default.find({ position: 'mentor' });
        const core = await Team_1.default.find({ position: 'core' });
        return res.status(200).json({
            "lead": lead,
            "co-lead": coLead,
            "mentor": mentor,
            "core": core
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server error'
        });
    }
};
exports.getTeamMembers = getTeamMembers;
const deleteTeamMember = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMember = await Team_1.default.findByIdAndDelete(id);
        if (!deletedMember) {
            return res.status(404).json({
                message: 'Member not found'
            });
        }
        return res.status(200).json({
            message: 'Member deleted'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
};
exports.deleteTeamMember = deleteTeamMember;
