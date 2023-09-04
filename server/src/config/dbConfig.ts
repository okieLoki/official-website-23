import mongoose from "mongoose";

const CONNECTION_URL = String(process.env.MONGO_URI);

async function connectDb() {
  await mongoose.connect(CONNECTION_URL);
}

export default connectDb