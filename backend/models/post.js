import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types



const post = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    postedby:{
        type: ObjectId,
        ref:"User"

    }
})
const Post = mongoose.model("Post",post);
export default Post;