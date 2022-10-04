const mongoose = require('mongoose')

const UserSchema =  mongoose.Schema({
    AccountNumber:{
        type:String,
    },
    AccountName:{
        type:String,
        // required:true
    },
    BankCode:{
        type: String,
        // required:true
    },
    isVerified:{
        type: Boolean
    }


},{timestamps:true})

const User = mongoose.model('user', UserSchema)

module.exports = {User}