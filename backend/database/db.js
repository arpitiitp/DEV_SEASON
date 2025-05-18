const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const DBconnection = async () => {
    // console.log("hello from db function");
    
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log('MongoDB connected Successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
module.exports = { DBconnection };