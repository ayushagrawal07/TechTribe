import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const googleSignin =  (req, res) => {
  const jwtsecret = process.env.jwtsecret;
  
  try {
    const { email, email_verified, name, photo, clientId, userName } = req.body;

    if (email_verified) {
      const savedUser =  User.findOne({ email: email });

      if (savedUser) {
        const token = jwt.sign({ _id: savedUser._id }, jwtsecret);
        const { _id, name, email, userName } = savedUser;
        return res.status(200).json({ token, user: { _id, name, email, userName },success:true});
      } else {
        const password = clientId + email;
        const user = new User({
          name,
          email,
          userName,
          password: password,
          photo,
        });

        const newUser =  user.save();
        const token = jwt.sign({ _id: newUser._id }, jwtsecret);
        const { _id, name, email, userName } = newUser;
        return res.status(200).json({
          token,
          user: { _id, name, email, userName },
          success: true,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Email not verified",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during sign-in",
    });
  }
};

export default googleSignin;
