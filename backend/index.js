// import express from 'express';
// import dbconnect from './dbconnect.js';
// import route from './routers/Routers.js';
// import cors from "cors";
// import { configDotenv } from 'dotenv';
// import path from "path"
// configDotenv();

// const PORT = process.env.PORT || 5000;

// const app = express();


// app.use(express.json());

// dbconnect();


// app.use(cors());


// app.use('/api',route)
// app.use(express.static(path.join(__dirname, "./client/build")))

// app.get("*", (req, res) => {
//     res.sendFile(
//         path.join(__dirname, "./client/build/index.html"),
//         function (err) {
//             res.status(500).send(err)
//         }
//     )
// })

// app.listen((PORT),(req,res)=>{
//     console.log(`Server started at port ${PORT}`);
    
//  });
 
import express from 'express';
import dbconnect from './dbconnect.js';
import route from './routers/Routers.js';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

configDotenv();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

dbconnect();

app.use(cors());

app.use('/api', route);

// Convert __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the frontend
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname, './client/build/index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
