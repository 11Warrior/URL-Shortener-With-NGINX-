import mongoose from "mongoose";

// console.log(process.env.MONGO_URI!);

export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI!).then(() => {
        console.log("Database Connected.");
    }).catch((error) => {
        console.log('Error connecting to the database', error);
    })
}