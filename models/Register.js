const mongoose = require('mongoose')

const registerschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileNo:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    }
},{timestamps:true})

const registerModel = mongoose.model('ecommarceapi',registerschema)

module.exports = registerModel