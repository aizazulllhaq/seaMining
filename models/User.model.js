const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "PATH_TO_DEFAULT_IMG",
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
    referralID: {
        type: String,
        enum:[]
    },
    levelAccount: {
        type: String,
        default: 0,
    },
    milestone: {
        type: String,
    },
    referralCode: {
        type: String,
    },
    referralID2: {
        type: String,
    },
    coins: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
})

exports.User = model("User", userSchema);