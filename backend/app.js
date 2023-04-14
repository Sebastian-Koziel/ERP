//fragile data... ES6...
import * as dotenv from 'dotenv'
dotenv.config({path: "./env/.env"});
//express
import express from "express";
//for testing on localhost
import cors from 'cors';
//db
import { connectDB }  from './db/config.js';


//connect DB
//connectDB();


//set up expressa
const app = express();
//for testing on localhost
app.use(cors());
//allow to handle json
app.use(express.json());

app.get("/url", (req, res, next) => {
    console.log(`wszystkie`)
    res.json(
        [
            { id: 1, name: 'Test1' },
            { id: 2, name: 'Test2' },
            { id: 3, name: 'Test3' }
        ]
        );
   });

app.get("/url/:id", (req, res, next) => {
    console.log(`pojedyncze ${req.params.id}` )
    if(req.params.id === '1'){
        res.json(
            
                { id: 1, name: 'Test1' },
            
            );
    }
    if(req.params.id === '2'){
        res.json(
            
            { id: 2, name: 'Test2' },
        
        );
    }
    if(req.params.id === '3'){
        res.json(
            
            { id: 3, name: 'Test3' },
        
        );
    }
    
   });

//app.use('/api/stages', require('./api/stages/routes/stages.routes'));

//set up PORTU - albo taki z env albo 5000
const PORT = process.env.PORT || 5000;

//start serva
const server = app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

