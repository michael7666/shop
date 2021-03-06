const mongoose = require("mongoose");
// const { roleManagement } = require("../middleware/roles");


const UserSchame = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    // isAdmin: {
    //     type: Boolean,
    //     default: false
    // },
    img: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "moderator", "user"],
        default:"user"
    }
}, {timestamps: true});

module.exports = mongoose.model("users", UserSchame);