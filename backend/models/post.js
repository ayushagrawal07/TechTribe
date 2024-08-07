import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types



const post = new Schema({
    title:{
        type:String,
       // required:true
    },

    body:{
        type:String,
        required:true
    },
    image:{
        type:String,required:true
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comments:[{
        comment:{type:String,required:true},
        postedby:{type:ObjectId,ref:"User"}
    }],
    postedby:{
        type: ObjectId,
        ref:"User"

    }
},{ timestamps: true });
const Post = mongoose.model("Post",post);
export default Post;