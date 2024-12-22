import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        userName: { type: string, required: true, unique: true, lowerCase: true, trim: true, index: true },
        email: { type: string, required: true, unique: true, lowerCase: true, trim: true },
        fullname: { type: string, required: true, lowerCase: true, trim: true, index: true },
        avtar: { type: string, required: true },
        coverImage: { type: string },
        watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
        password: { type: string, required: [true, 'Password is required'] },
        refreshToken: { type: string }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {

    if (!this.isModified()) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id, email: this.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY }); // 7 days token expiration time 1 day = 24 hours * 60 minutes * 60 seconds = 86400 seconds
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }); // 30 days token expiration time 1 day = 24 hours * 60 minutes * 60 seconds = 86400 seconds
}

export const User = mongoose.model('User', userSchema);1