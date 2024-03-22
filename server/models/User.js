const mongoose = require("mongoose")

const UserSchema =  new mongoose.Schema({
    username: String,
    password: String,
    role: Number
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel