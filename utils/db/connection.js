import mongoose from "mongoose";
export const createConnection = async () => {
    return mongoose.connect(process.env.DB_URL,{
        maxPoolSize:5,
    })
}