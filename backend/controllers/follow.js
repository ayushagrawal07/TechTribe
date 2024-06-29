import User from "../models/user.js"
const follow = (req,res)=>{
    try {
        User.findByIdAndUpdate(req.body.followId,{
            $push:{followers:req.user._id}            
        },{new:true}).then(result=>{
            User.findByIdAndUpdate(req.user._id,{
                $push:{following:req.body.followId}
            },{new:true}).then(result2=>{
                return res.status(200).json(result2);
            })
            .catch(e=>{
                console.log(e);
                return res.status(422).json({
                    message:"error in follow",
                    success:false
                })
            })
        })
        
        
    } catch (e) {
        console.log(e);
                return res.status(422).json({
                    message:"error in follow",
                    success:false
                })
    }
}
export default follow;