import React, {  useEffect, useState } from 'react';

import PostModel from './PostModel';   
import dotenv from 'dotenv';
dotenv.config();
const Base_Url = process.env.Base_Url;

const ProfilePage = () => {
  const [posts,setposts] = useState([]);
  const [selectedpost,setselectedpost] = useState(null);
  const [user,setuser] = useState("")
  useEffect(()=>{
    fetch(`${Base_Url}/api/userprofile/${JSON.parse(localStorage.getItem("user"))._id}`,{
      headers:{
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then(result=>{
      setposts(result.posts);
      setuser(result.user);
      
    })
    .catch(e=>console.log(e.message))
  },[])

  const toggledetails=(post)=>{
    if(selectedpost){
      setselectedpost(null);
      setposts(posts);
      

    }
    else {
      setselectedpost(post);
      
    }
  }
 console.log(user);
  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-900">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{JSON.parse(localStorage.getItem("user")).name}</h1>
            <p className="text-gray-600">Bio about the user goes here</p>
          </div>
        </div>
        <div className="flex space-x-8">
          <div className="text-center">
            <span className="font-bold">{posts.length?posts.length:0}</span>
            <p className="text-gray-600">Posts</p>
          </div>
          <div className="text-center">
            <span className="font-bold">{user.followers?user.followers.length:0}</span>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <span className="font-bold">{user.following?user.following.length:0}</span>
            <p className="text-gray-600">Following</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
              {/* {console.log(posts[0].comments[0].postedby.image)} */}
        {
          posts.map((post)=>{
            return (
             
            <img src={post.image} className='cursor-pointer' onClick = {()=>toggledetails(post)}/> 
            
          )
          })
        }
      {
        selectedpost && <PostModel post = {selectedpost} onClose = {toggledetails}/>
      }

      </div>
    </div>
  );
};

export default ProfilePage;
