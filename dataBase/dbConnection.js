import mongoose from "mongoose";

export const dbConnection = () => {

    mongoose.connect(process.env.DB_CONNECTION)
    .then( () => {
        console.log('Database connected successfully')
    })
    .catch( (err) => {
        console.log('Database connection failed',err)
    })
}