const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength:3,
        maxLength:20
    },
    middlename: {
        type: String,
        //required: true,
    },lastname: {
        type: String,
        required: true,
        minLength:3,
        maxLength:20
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ["member", "admin"],
        default: "member"
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true
    },
    deposits: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Member", memberSchema);