"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const teamMemberSchema = new mongoose_1.default.Schema({
    "name": {
        type: String,
        required: true
    },
    "position": {
        type: String,
        enum: ["lead", "co-lead", "mentor", "core"],
        required: true
    },
    "role": {
        type: String,
        required: function () {
            return this.position === "mentor";
        }
    },
    "email": {
        type: String,
        required: true
    },
    "linkedin_url": {
        type: String
    },
    "github_url": {
        type: String
    },
    "twitter_url": {
        type: String
    },
    "medium_url": {
        type: String
    },
    "image": {
        type: String
    }
});
const Team = mongoose_1.default.model('Team', teamMemberSchema);
exports.default = Team;
