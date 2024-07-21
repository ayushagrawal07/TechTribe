import mongoose from 'mongoose';
const { Schema } = mongoose;

const otp = new Schema({
    email: String,
    code: String,
    expiresIn: Number
}, { timestamps: true })


const OTP = mongoose.model("OTP", otp);
export default OTP;