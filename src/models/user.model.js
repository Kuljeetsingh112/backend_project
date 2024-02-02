import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        require: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        require: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    refreshtoken: {
        type: String
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, process.env.ACCES_TOKEN_SECRET, {
        expiresIn: process.env.ACCES_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const user = mongoose.model("User", userSchema)