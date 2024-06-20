import React, { useState,  } from 'react';
import { Heart } from "lucide-react";
import { FcLike } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import {toast} from "react-toastify"


const Card = ({ post }) => {
  const [data, setData] = useState(post); // Initial state set to null
  const [comment, setComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false); // State for showing all comments
  

  const handleLike = (id) => {
    fetch("http://localhost:5000/api/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ id })
    }).then(res => res.json())
      .then(result => {
        setData(result);
      });
  };

  const handleUnlike = (id) => {
    fetch("http://localhost:5000/api/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ id })
    }).then(res => res.json())
      .then(result => {
        setData(result);
      });
  };

  const handleComment = (comment, id) => {
    fetch("http://localhost:5000/api/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        id: id,
        text: comment
      })
    }).then(res => res.json())
      .then(result => {
        setData(result);
        setComment("");
        toast.success("Comment posted");
      }).catch(e => console.log(e));
  };

  const toggleShowComments = () => {
    setShowAllComments(!showAllComments); // Toggle function to show/hide comments
  };

  
  const renderComments = () => {
    if (!data || !data.comments) return null; // Return null if data is not ready

    const commentsToShow = showAllComments ? data.comments : data.comments.slice(0, 1); // Show all comments or just the first one
    return commentsToShow.map((comment, index) => (
      <div key={index} className="flex items-center space-x-3">
        <img src="https://placekitten.com/32/32" alt="User Avatar" className="w-8 h-8 rounded-full" />
        <div>
        <p className="text-gray-800 font-semibold">{comment.postedby?.name || 'Anonymous'}</p> {/* Use optional chaining */}
          <p className="text-gray-500 text-sm">{comment.comment}</p>
        </div>
      </div>
    ));
  };

 

  return (
    <div className="flex justify-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img src="https://placekitten.com/40/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-gray-800 font-semibold">{data.postedby.name}</p> {/* Ensure correct field is accessed */}
              <p className="text-gray-500 text-sm">Posted 2 hours ago</p>
            </div>
          </div>
          <div className="text-gray-500 cursor-pointer">
            <button className="hover:bg-gray-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="17" r="1" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-800">{data.body}</p>
        </div>
        <div className="mb-4">
          <img src={data.image} alt="Post Image" className="w-full h-64 object-cover rounded-md" />
        </div>
        <div className="flex items-center justify-between text-gray-500 mb-4">
          <div className="flex items-center space-x-3">
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full">
              {
                data.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                  ? (
                    <>
                      <FcLike onClick={() => handleUnlike(data._id)} size={27} />
                      <span>{data.likes.length} Likes</span>
                    </>
                  )
                  : (
                    <>
                      <Heart onClick={() => handleLike(data._id)} />
                      <span>{data.likes.length} Likes</span>
                    </>
                  )
              }
            </button>
          </div>
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"></path>
            </svg>
            <span>{data.comments.length} Comments</span>
          </button>
        </div>
        <hr className="mt-2 mb-4" />
        <p className="text-gray-800 font-semibold mb-2">Comments</p>
        <div className="mt-4 space-y-4">
          {renderComments()} {/* Render comments dynamically */}
        </div>
        {data.comments.length > 1 && (
        <button
        onClick={toggleShowComments}
        className="flex items-center text-green-800 hover:underline focus:outline-none"
      >
        {showAllComments ? <IoEyeOffOutline className="mr-1" /> : <IoEyeOutline className="mr-1" />}
        {showAllComments ? "Hide comments" : "View more comments"}
      </button>
        )}
        <div className="mt-4">
          <textarea
            className="text-gray-900 w-full p-2 border rounded-md"
            rows="2"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="mt-2 px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  onClick={() => handleComment(comment, data._id)}
>
  Post
</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
