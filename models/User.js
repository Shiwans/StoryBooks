const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Id:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        // required:true
    },
    lastName:{
        type:String,
        // required:true
    },
    image:{
        type:String,
    },
    loginType:{
        type:String,
        required:true
    },
    createdAt: {
        type:Date,
        defautl:Date.now
    }
})

module.exports = mongoose.model('User',UserSchema)