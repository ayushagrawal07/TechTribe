import Post from "../models/post.js";
const profileposts = (req,res) => {
     try {
        Post.find({postedby:req.user._id})
        .populate("comments","comment postedby")
        .populate("postedby","name _id")
        .populate("comments.postedby" ,"name image _id")
        .then(posts=>res.json(posts))        
        .catch(e=>{

         console.log(e)
         res.status(402).send({
            success:false,
            message:"Something went wrong"
         })
      });
        
         
     } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Some error while fetching"
        })
     }
}
export default profileposts;