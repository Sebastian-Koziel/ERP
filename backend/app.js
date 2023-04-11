//fragile data
require('dotenv').config({path: "./env/.env"});
//express
const express = require("express");
//db
const connectDB = require('./db/config');


//connect DB
connectDB();


//set up expressa
const app = express();
//allow to handle json
app.use(express.json());

app.get("/url", (req, res, next) => {
    res.json(
        [
            { id: 1, name: 'Test1' },
            { id: 2, name: 'Test2' },
            { id: 3, name: 'Test3' }
        ]
        );
   });

app.use('/api/stages', require('./api/stages/routes/stages.routes'));

//set up PORTU - albo taki z env albo 5000
const PORT = process.env.PORT || 5000;

//start serva
const server = app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

