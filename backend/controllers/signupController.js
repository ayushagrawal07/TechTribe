import User from "../models/user.js";
import bcrypt from "bcrypt";
const signupController = async (req,res) => {
 try{
    const {name,email,username,password} =  req.body;
    
    if(!name || !email || !username | !password){
        return  res.status(500).json({
            message:"Enter the details carefully",
            success:false
        })
    }
    User.findOne({$or:[{email:email},{username:username}]}).then(async (saveduser)=>{
        if(saveduser){
           return res.status(422).json({
                message:"User already exists",
                success:false
            })
        }
        const salt = 10;
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.log(err);
              return  res.status(500).json({
                    message:"Error while bcrypting"
                })
                
            } 

            const user =  new User({
                name,email,username,password:hash
            })
            const newuser = await user.save();
            if(newuser){
           return res.status(200).json({
                message:"Created Successfully",
                status:true
            })
        }
        else {
           return res.status(400).json({
                message:"nai hua",success:false
            })
        }    
       
        });
       
    
}
    )
 }
 catch(e){
    console.log(e);
    return res.status(500).json({
        
        message:"Not able to create",success:false
    })
 }
}

export default signupController