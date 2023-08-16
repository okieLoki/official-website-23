import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
    }
  }
}

async function connectDb() {
  await mongoose.connect(process.env.MONGO_URI);
}

export default connectDb
