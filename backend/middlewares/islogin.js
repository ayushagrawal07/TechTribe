import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js"
dotenv.config();
                       
const jwtsecret = process.env.jwtsecret;
const islogin = (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: "You have to login to create post"
        })
    }
    const token = authorization.replace("Bearer ","");

    jwt.verify(token, jwtsecret, (err, payload) => {

        if (err) {
            return res.status(401).send({
                message: "Error while Verification"
            })
        }

        const { _id } = payload;

        User.findById(_id).then((filteredUser) => {

            

            req.user = filteredUser;
            next();

        })
        .catch(e=>{
            console.log(e);
            return res.status(401).send({
                success:false,
                message: "User not found in db"
            })
        })



    })



}
export default islogin;