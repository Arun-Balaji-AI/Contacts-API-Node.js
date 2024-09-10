const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Enter username"],
        unique: [true, "Username already taken"]
    },
    email: {
        type: String,
        required: [true, "Enter email"],
        unique:[true , "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Enter Password"]
    }
});

module.exports = mongoose.model("UserSchema", userSchema);