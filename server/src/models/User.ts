import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    token: {
        type: String,
    }
})

export default mongoose.model("User", UserSchema);