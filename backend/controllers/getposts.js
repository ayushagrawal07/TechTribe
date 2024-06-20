import posts from "../models/post.js"

const getposts=(req,res)=>{
try {
    posts.find()
    .populate("comments.postedby","_id name ")
    .populate("postedby","_id name")
    .then((allpost)=>{
       return res.json(allpost)
    })
    .catch(e=>console.log(e));
    
        
} catch (error) {
    console.log(error);
    return res.json({
        success:false
    })
}
}
export default getposts