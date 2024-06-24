import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Context } from '../context/Context';

const CreatePostForm = () => {

  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [url, setUrl] = useState("");   
  const {setloading} = useContext(Context);      
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  useEffect(() =>
    {
      if(url)
    {fetch(`${window.location.origin}/api/createpost`, {

      method: "post",

      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),

      },
      body: JSON.stringify({

        body: content,
        photo: url

      })
    })
      .then(res => res.json())
      .then((data) => {
        if (data.success === false)
          toast.error(data.message)
        else{ toast.success(data.message)
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
    }

  },[url]);

  const handleSubmit = (e) => {
    
    e.preventDefault();
    
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "techtribe0");
    data.append("cloud_name", "goalt");

    fetch("https://api.cloudinary.com/v1_1/goalt/image/upload",
      {
        method: "post",
        body: data
      }
    ).then(res => res.json())
      .then(data => {

        setUrl(data.url)
        

      })
      .catch(e => console.log(e))


  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/150"
          alt="Dds"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <p className="text-gray-700 text-sm font-bold">Rajesh</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="post-content"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            What's on your mind?
          </label>
          <textarea
            id="post-content"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="5"
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="post-image"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Image (optional)
          </label>
          <input
            type="file"
            id="post-image"
            accept="image/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="post-video"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Video (optional)
          </label>
          <input
            type="file"
            id="post-video"
            accept="video/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleVideoChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
