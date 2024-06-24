import express from 'express';
import dbconnect from './dbconnect.js';
import route from './routers/Routers.js';
import cors from "cors";

const PORT = 5000;

const app = express();


app.use(express.json());

dbconnect();


app.use(cors());


app.use('/api',route)

app.listen((PORT),(req,res)=>{
    console.log(`Server started at port ${PORT}`);
    
 });
 