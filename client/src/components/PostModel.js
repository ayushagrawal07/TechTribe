import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify"
import dotenv from 'dotenv';
dotenv.config();
const Base_Url = process.env.Base_Url;

export default function PostModal({ post, onClose }) {
const navigate = useNavigate()
  const handelDelete=(postid)=>{
    console.log(postid,"Hey");
    fetch(`${Base_Url}/api/deletepost/${postid}`,{
      method:"delete",
      headers:{
        Authorization : "Bearer " + localStorage.getItem("jwt")
      }

    })
    .then(res=>res.json())
    .then(d=>{
      if(d.success === true){
        console.log("deleted post")
        onClose();
        toast.warn("Post Deleted");
        navigate("/")

      
      }
      else{
        console.log(d.message);
        toast.error("Not able to delete");
        console.log("Not able to delete")
      }
    })
    .catch(e=>{
      toast.error("Not able to delete");
      console.log(e);
    })

  }
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-xl max-w-md w-full md:max-w-3xl relative overflow-auto max-h-screen">
        <button className="absolute top-2 right-2 text-green-500 font-bold hover:bg-green-100" onClick={onClose}>
          <AiFillCloseCircle size={40} />
        </button>
        <div className="flex flex-col md:flex-row">
          <img src={post.image} alt={`Post ${post._id}`} className="w-full md:w-1/2 h-48 md:h-auto object-cover rounded-lg mb-4 md:mb-0 md:mr-4" />
          <div className="flex flex-col justify-between w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold flex items-center hover:bg-red-100">
                <FcLike className="mr-1 " size={29} /> {post.likes.length}
              </div>
              <button className="text-gray-700 ml-4 mx-10 my-10 hover:bg-gray-200 " onClick={()=>handelDelete(post._id)}>
                <FaTrashAlt size={26} />
                Delete Post
              </button>
            </div>
            <h3 className="text-lg font-semibold mb-1">Comments:</h3>
            <div className="space-y-2 overflow-y-auto max-h-60">
              {post.comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded-lg flex items-center space-x-2">
                  <img src={comment.postedby.image} alt={comment.postedby.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    {console.log(comment.postedby)}
                    <p className="font-semibold">{comment.postedby.name}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
