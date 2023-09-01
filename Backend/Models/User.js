//Define the data models for your MongoDB documents.

const mongoose= require('mongoose')
const userSchema= new mongoose.Schema({
    name: String,
    email:{
        type:String,
        unique: true,
    },
    password: String,
    role : {
        type: String,
        enum: ['admin' , 'user'],
        default: 'user',
    }
}) 

//Creating mongoose model
// const User= mongoose.model('User', userSchema);

// module.exports= User;
module.exports = mongoose.model("User", userSchema)