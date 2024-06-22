// import Post from "../models/post.js"
// const deletepost=(req,res)=>{
// try {
//     const postid = req.params.postId;
    
//     Post.findOneAndDelete({_id:postid}
//         .populate("postedBy", "_id")
//         .then((result)=>{
//             console.log(result);
//             if(result.postedby._id.toString()=== req.user._id.toString()){
//             return res.status(200).json({
//                 success:true,
//                 message:"Deleted post successfully"
//             })
//         }
//         return res.status(402).json({
//             succcess:false,
//             message:"Only owner can delete"
//         })
        
//         })
//         .catch((e)=>{
//             console.log(e);
//             return res.status(402).json({
//                 succcess:false,
//                 message:"Post not found"
//             })
//         })
//     )

// } catch (error) {
//     console.log(error);
//     return res.status(402).json({
//         succcess:false,
//         message:"Post not found"
//     });
// }
// }
// export default deletepost;


import Post from "../models/post.js";

const deletepost = async (req, res) => {
  try {
    const postid = req.params.postId;
    console.log(postid);
    Post.findOne({_id:postid})
    .populate("postedby","_id")
    .then(post=>{
        if(!post){
            return res.status(500).json({
                success: false,
                message: "Post not found",
              });
        }
        if (post.postedby._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
              success: false,
              message: "Only the owner can delete this post",
            })
        }
        post.deleteOne()
        .then(result => {
            return res.json({ success:true,message: "Successfully deleted" })
        }).catch((err) => {
            console.log(err)
            return res.json({ success:false,message: "Err" })
           
        })
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

export default deletepost;
