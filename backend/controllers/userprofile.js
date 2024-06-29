import User from "../models/user.js";
import Post from "../models/post.js";
const  userprofile = (req,res) =>{
try {
    const userid = req.params.id;
    
    User.findOne({_id:userid})
    .populate("_id name")
    .then(user=>{
        Post.find({postedby:userid})
        .populate("postedby","_id name followers following")
        .then(posts=>{
            return res.json({user,posts})
        })
        .catch(e=>{
            console.log(e)
            return res.status(402).send({
                message:"Not able to fetch",
                status:false
            })

        })
    })
    .catch(e=>{
        console.log(e)
        return res.status(402).send({
            message:"Not able to fetch",
            status:false
        })
    
    });

} catch (error) {
    return res.json({
        message:"Error"
    })
}
}
export default userprofile;