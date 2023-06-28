const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_name :{
        type : String
    },
    user_password : {
        type : String
    },
    user_role : {
        type : String
    },
    user_mobile : {
        type : Number
    }
})

module.exports = mongoose.model("users", userSchema)