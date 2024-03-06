const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const { createTokenForUser } = require("../utils/authenticationToken");
const ExpressError = require("../middlewares/ApiError");

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: "/uploads/public/userAvatar.jpeg"
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: "USER"
    },
    is_verify: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: Number,
    },
    address: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
    referredBy: {
        type: String,
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
    referred: {
        type: String,
    },
    coins: {
        type: Number,
        default: 0,
    },
    seaCoin: {
        type: Number,
    },
    token: {
        type: String,
    },
    rp_token: [
        {
            type: String
        }
    ],
    googleId: {
        type: Number
    },
    lastMiningTime: {
        type: Number,
        default: null,
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = await bcrypt.genSalt(16);;

    const hashedPassword = await bcrypt.hash(user.password, salt);

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User Not Found');
    // const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = await bcrypt.compare(password, hashedPassword);

    // if (hashedPassword !== userProvidedHash) throw new Error("Incorrect Credentials");
    if (!userProvidedHash) throw new Error('Invalid Credentials');
    const token = createTokenForUser(user);

    return token;
})


exports.User = model("User", userSchema);
