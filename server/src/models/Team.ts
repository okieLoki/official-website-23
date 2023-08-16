import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
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

const Team = mongoose.model('Team', teamMemberSchema);

export default Team;
