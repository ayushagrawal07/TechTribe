import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js"
dotenv.config();
const jwtsecret = process.env.jwtsecret;
const islogin = (req,res,next) => 
{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({
            success:false,
            message:"You have to login to create post"
        })
    }
    const token  = authorization.replace("Bearer ","");
    console.log(token);

    jwt.verify(token,jwtsecret,(err,payload)=>{
       
        if(err){
            return res.status(401).json({
                message:"error while verification"
            })
        }

        const {_id} = payload;

        User.findById(_id).then((filteredUser)=>{
            
            if(!filteredUser){
                res.status(401).json({
                    message:"Please register to post"
                })
            }

            req.user = filteredUser;
            next();
           
        })
        


    })



}
export default islogin;