import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwtt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtsecret = process.env.jwtsecret;

const signincontroller = (req,res)=>{
try{
    const {email,password} = req.body;
    User.findOne({email:email}).then((saveduser)=>{
        if(!saveduser){
            return res.status(422).json({
                message:"Email doesnt exists",
                success:false
            })
        }
        bcrypt.compare(password,saveduser.password,(err,response)=>{
               if(err){
              return  res.status(422).json({
                    success:false,
                    message:"Pata nai ky hua"
                })
               }
               if(response){
              const token = jwtt.sign({_id:saveduser.id},jwtsecret);
               return res.send({token});
               }
               else {
                return res.status(422).json({
                    success:false,
                    message:"Password does not matches"
                })
               }
        })
        
    })
    
}
catch{
    console.log(error);
    return res.status(400).json({
        success:false,message:"Something unusal happened"
    })
}
}
export default signincontroller;