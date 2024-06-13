import Post from "../models/post.js"
const createpost=(req,res)=>{
 try{
    const {body,title} = req.body;
    if(!title || !body){
        return res.status(401).json({
            success:false,
            message:"Please add all fields"
        })
    }
     res.json({
        message:"Ok"
    })
    console.log(req.user);
 }
 catch(e){
console.log(e);
res.status(401).json({
    message:"Not able to post"
})
 }
}
export default createpost;