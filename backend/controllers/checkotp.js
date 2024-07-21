import OTP from "../models/otp.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt';

const checkotp = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    console.log(otp);

    // Find the OTP document associated with the email
    const data = await OTP.findOne({ email: email });

    if (!data) {
      return res.json({
        status: 500,
        message: "OTP not found"
      });
    } else {
      let currTime = new Date().getTime();
      let diff = data.expiresIn - currTime;
      if (diff < 0) {
        return res.json({
          status: 500,
          message: "OTP expired",
          success: false
        });
      } else {
        console.log(data.code);
        if (otp == data.code) { // Ensure you use `==` to compare string and number
          let user = await User.findOne({ email: email });
          const salt = 10;
          bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
              console.log(err);
              return res.json({
                status: 500,
                message: "Error while hashing password"
              });
            }
            user.password = hash;
            await user.save();
            return res.json({
              status: 200,
              message: "Password updated successfully"
            });
          });
        } else {
          return res.json({
            status: 500,
            message: "Enter correct OTP"
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Something went wrong"
    });
  }
};

export default checkotp;
