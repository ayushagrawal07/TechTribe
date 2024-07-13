import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types

const user = new Schema({
    name :{
        type :String,
        required :true
    },
    email :{
        type :String,
        required :true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    Photo: {
        type: String,
    },
    followers:[{
        type:ObjectId,
        ref:"User"
    }],
    following:[{
        type:ObjectId,
        ref:"User"
    }]
});

const User = mongoose.model("User", user);
export default User;