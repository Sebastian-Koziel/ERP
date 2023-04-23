//fragile data... ES6...
import * as dotenv from 'dotenv'
dotenv.config({path: "./env/.env"});
import jwt from 'jsonwebtoken';
//express
import express from "express";
//for testing on localhost
import cors from 'cors';
//db
import { connectDB }  from './db/config.js';
import mongoose from 'mongoose';

//connect DB
connectDB();

//import * as authRoutes from'./api/auth/routes/auth.js';

//set up expressa
const app = express();
//for testing on localhost
app.use(cors());
//allow to handle json
app.use(express.json());

//app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

const KEY = 'supersecret';

function createJSONToken(login) {
  return jwt.sign({ login }, KEY, { expiresIn: '1h' });
}

///// LOGIN ////

app.post("/login", async (req, res, next ) => {
    console.log(`trying to log back`)
    const { login, password} = req.body;

    console.log(login, password)

    if(!login || !password){
        console.log(`error`);
    }

    try{
        //takes 1 from database and define password
        const user = await User.findOne({ login }).select("+password");

        //if count not find
        if(!user) {
            
            console.log(`no user`);
            return;
        }

        let token = createJSONToken(login);
        res.json({success: true, token, user});

        

    }
    catch (error){
        console.log(`error catch`);
    }
});

///// USERS //////

const UserSchema = new mongoose.Schema({
    login : {
        type : String,
        require: [true, "Pleae provide a mail"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Pleae provide a password"],
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    access: {
        role: {
            type: String
        },
        usersNav:{
            general: {
                type: Boolean,
                default: true
            }
        },
        stages: {
            general: {
                type: Boolean,
                default: true
            }
        }
    }
   
    
});

const User = mongoose.model("User", UserSchema);

app.get("/url/users", async (req, res, next) => {
    console.log(`zapytanie o wszystkich userow ${zapytanie}`)
    
    try{
    const users = await User.find({} );
    
    res.json(users); 
    }
    catch{

    }
   });

app.get("/user/:id", async (req, res, next) => {
    console.log(`zapytanie usera ${req.params.id}`)
    const id = req.params.id;
    try{
        console.log(id)
    const user = await User.findById(id);
    
    res.json(user); 
    }
    catch{
        console.log(`error`)
    }
});

app.delete("/user/delete/:id", async (req, res, next) => {
    console.log(`usuwam usera ${req.params.id}`)
    const id = req.params.id;
    try{
        
    await User.findByIdAndDelete(id);
    res.json({message: 'wsio ok'} );
    }
    catch{
        console.log(`error`)
    }
});

app.post("/user/add", async (req, res, next) => {
        
    const {login, password, role, name, surname} = req.body;

    console.log('probuje dodac usera');

    try {
        const user = await User.create({
            login: login,
        password: password,
        name: name,
        surname: surname,
        access: {
                    role: role,
                }
            });
        
        
        res.json(user._id );
    }
    catch (error) {
        
    }
});

   



///STAGES////

//app.use(authRoutes);
let zapytanie = 0;

const dummy = [
    { id: 1, name: 'Test1' },
    { id: 2, name: 'Test2' },
    { id: 3, name: 'Test3' }
]

app.get("/url", (req, res, next) => {
    console.log(`wszystkie`)
    res.json(
        dummy
        );
   });

app.post("/stage/add", (req, res, next) => {
    dummy.push(
        {
        id: Math.random(),
        name: req.body.name
        }
        );
})

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

