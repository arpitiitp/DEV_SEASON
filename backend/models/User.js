const mongoose = require('mongoose');

const userschema= new mongoose.Schema({
    firstName:{
        type:String,
        default:null,
        required:true
    },
    lastName:{
        type:String,
        default:null,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Users',userschema);