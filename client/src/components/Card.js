import React,{useState} from 'react';
import {Heart} from "lucide-react"
import { FcLike } from "react-icons/fc";
const Card = ({post}) => {
  const [data,setdata]  = useState(post);
 const handlelike =(id)=>{
  fetch("http://localhost:5000/api/like",{
    method:"put",
    headers:{
      "Content-Type" : "application/json",
      "Authorization":"Bearer " + localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      id:id
    })
  }).then(res=>res.json())
  .then(result=>{
 
    setdata(result);
  })
 }
 const handleunlike =(id)=>{
  fetch("http://localhost:5000/api/unlike",{
    method:"put",
    headers:{
      "Content-Type" : "application/json",
      "Authorization":"Bearer " + localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      id:id
    })
  }).then(res=>res.json())
  .then(result=>{
  
    setdata(result);
  })
 }

  return (
    <div className="flex justify-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img src="https://placekitten.com/40/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-gray-800 font-semibold">{data.postedby.name}</p>
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
          <p className="text-gray-800">{data.body}
          </p>
        </div>
        <div className="mb-4">
          <img src={data.image} alt="Post Image" className="w-full h-64 object-cover rounded-md" />
        </div>
        <div className="flex items-center justify-between text-gray-500 mb-4">
          <div className="flex items-center space-x-3">
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full">
            {
              data.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
              ?(  <>              
                <FcLike onClick={()=>handleunlike(data._id)} size={27}/>                 
                 <span>{data.likes.length} Likes</span>
                 </>
              
              )
              :
              (
               <>
                <Heart onClick={()=>handlelike(data._id)}/>               
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
            <span>3 Comments</span>
          </button>
        </div>
        <hr className="mt-2 mb-4" />
        <p className="text-gray-800 font-semibold mb-2">Comments</p>
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-3">
            <img src="https://placekitten.com/32/32" alt="User Avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-gray-800 font-semibold">Jane Smith</p>
              <p className="text-gray-500 text-sm">Lovely shot! 📸</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <img src="https://placekitten.com/32/32" alt="User Avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-gray-800 font-semibold">Bob Johnson</p>
              <p className="text-gray-500 text-sm">I can't handle the cuteness! Where can I get one?</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 ml-6">
            <img src="https://placekitten.com/40/40" alt="User Avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-gray-800 font-semibold">John Doe</p>
              <p className="text-gray-500 text-sm">That little furball is from a local shelter. You should check it out! 🏠😺</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
