import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"


const connectDB = async () => {
    try {
        const Connected = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`mongodb connected successfully!! DB Host: ${Connected.connection.host}`)
    } catch (error) {
        console.log("ERROR: ", error)
        process.exit(1)
    }
}

export default connectDB;