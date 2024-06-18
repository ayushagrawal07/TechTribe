import Post from "../models/post.js"
const unlike = (req,res)=>{
    try {        
        Post.findByIdAndUpdate(req.body.id,{$pull:{likes:req.user._id}},{new:true})
        .then((result)=>{
           res.status(200).json(result)
        })
        .catch(error=>{
            console.log(error)
            res.status(402).send({
                message:"Something went wrong",
                success:false
            })
        })
    } catch (error) {
        console.log(error)
      return  res.status(402).send({
            success:false,
            message:"Something went wrong 1"
        })
    }
}
export default unlike;