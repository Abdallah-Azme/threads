import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_DB_URL) {
    return console.error("MongoDB Url is not available");
  }
  if (isConnected) {
    return console.log("Already connected to MongoDB");
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    isConnected = true;
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
};
