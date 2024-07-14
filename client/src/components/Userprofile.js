import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostModel from './PostModel';
import dotenv from 'dotenv';
dotenv.config();
const Base_Url = process.env.Base_Url;
const Userprofile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${Base_Url}/api/userprofile/${id}`, {
      method: "get",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then(result => {
      setUser(result.user);
      setPosts(result.posts);
      console.log(result.user);
      if (
        result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)
      ) {
        setIsFollowing(true);
      }
    });
  }, [id,isFollowing]);

  const toggleDetails = (post) => {
    if (selectedPost) {
      setSelectedPost(null);
      setPosts(posts);
    } else {
      setSelectedPost(post);
    }
  };

  const handleFollow = () => {
    const url = isFollowing ? `${Base_Url}/api/unfollow` : `${Base_Url}/api/follow`;
    fetch(url, {
      method: 'put',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ followId: id }) // Use profile user ID
    })
    .then(res => res.json())
    .then(result => {

      console.log("done");
      setIsFollowing(!isFollowing);
    })
    .catch(e => console.log(e.message));
  };

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
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">Bio about the user goes here</p>
          </div>
        </div>
        <div className="flex space-x-8 items-center">
          <div className="text-center">
            <span className="font-bold">{posts.length}</span>
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
          <button
            onClick={handleFollow}
            className={`px-4 py-2 rounded-full font-bold text-white ${isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <img
            key={post._id}
            src={post.image}
            alt={post.title}
            className='cursor-pointer'
            onClick={() => toggleDetails(post)}
          />
        ))}
        {selectedPost && <PostModel post={selectedPost} onClose={toggleDetails} />}
      </div>
    </div>
  );
};

export default Userprofile;
