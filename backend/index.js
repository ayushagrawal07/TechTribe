import express from 'express';
import route from './routers/Routers.js';
import cors from 'cors';
import { config as configDotenv } from 'dotenv';
import mongoose from 'mongoose';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

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

// Use fileURLToPath and dirname to get __dirname equivalent
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//     res.sendFile(
//         path.join(__dirname, "../client/build/index.html"),
//         function (err) {
//             res.status(500).send(err);
//         }
//     );
// });

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
