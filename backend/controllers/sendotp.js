import User from "../models/user.js";
import Otp from "../models/otp.js";
import nodemailer from "nodemailer";



const sendotp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(500).json({
        message: "Email does not exist",
        success: false
      });
    }

    // Check if an OTP already exists for the email
    let otpData = await Otp.findOne({ email: email });

    const otpCode = Math.floor((Math.random() * 1000000) + 1);
    const expiryTime = new Date().getTime() + 300 * 1000;

    if (otpData) {
      // Update the existing OTP and expiry time
      otpData.code = otpCode;
      otpData.expiresIn = expiryTime;
      await otpData.save();
    } else {
      // Create a new OTP document
      otpData = new Otp({
        email: email,
        code: otpCode,
        expiresIn: expiryTime
      });
      await otpData.save();
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: "aushagarwal123@gmail.com",
        pass: "twxzkgfoajvmwque"
      }
    });

    // Email options
    const mailOptions = {
      from: "aushagarwal123@gmail.com",
      to: email,
      subject: "Reset password OTP verification",
      text: `OTP for password reset is ${otpCode}`
    };

    // Send the email
    transporter.sendMail(mailOptions)
      .then(() => {
        return res.json({
          status: 200,
          success: true,
          message: "OTP sent to email"
        });
      })
      .catch(e => {
        console.log(e);
        return res.status(500).json({
          message: "Unable to send OTP. Try again later!",
          success: false
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong sending OTP",
      success: false
    });
  }
};

export default sendotp;
