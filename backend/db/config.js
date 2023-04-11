const mongoose = require('mongoose');

// creating function to connect - fragile data in ENV format
const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
    });

    console.log('mongoDB connected');
}

module.exports = connectDB;