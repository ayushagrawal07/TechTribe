import express from 'express';
import route from './routers/Routers.js';
import cors from 'cors';
import { config as configDotenv } from 'dotenv';
import mongoose from 'mongoose';


configDotenv();

const PORT = 5000;

const app = express();

app.use(express.json());

const Mongo = process.env.MongoUrl;

mongoose.connect(Mongo)
    .then(() => 
        console.log("Db Connected")
    ).catch((e) => {
        console.log(e);
        console.log("Error while connecting db");
    });

app.use(cors());

app.use('/api', route);


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
