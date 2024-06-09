import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const Mongo = process.env.MongoUrl;

const dbconnect = () =>{
    mongoose.connect(Mongo)
    .then(() => 
        console.log("Db Connected")
).catch((e)=>{
    console.log(e);
    console.log("Error while connecting db");
})
}

export default dbconnect;

