import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function connectToDb(){
    try {
        await mongoose.connect(process.env.Mongo_URL);
        console.log(process.env.Mongo_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Could not connect to DB");
        console.log("MongoDB connection error:",error);
    }
}

export default connectToDb;  
