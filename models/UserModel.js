const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
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
    },
    password:{
        type:String,
        required:true
    },
    image: {
        public_id: {
            type: String
        },

        url: {
            type: String
        }
    }

},{timestamps:true})

const UserModel = mongoose.model('ecommarceapi',userschema)

module.exports = UserModel