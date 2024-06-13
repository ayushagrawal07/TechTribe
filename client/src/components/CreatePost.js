

// import React, { useState } from 'react';

// const CreatePostForm = () => {
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
//   const [video, setVideo] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setVideo(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can handle the submission logic here (e.g., send to backend)
//     const formData = new FormData();
//     formData.append('content', content);
//     if (image) {
//       formData.append('image', image);
//     }
//     if (video) {
//       formData.append('video', video);
//     }
//     console.log('Submitted data:', formData);

//     // Reset form state
//     setContent('');
//     setImage(null);
//     setVideo(null);
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white shadow-md rounded my-10 px-8 pt-6 pb-8 mb-4">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="post-content"
//             className="block text-gray-700 text-sm font-bold mb-2"
//           >
//             What's on your mind?
//           </label>
//           <textarea
//             id="post-content"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             rows="5"
//             placeholder="Share your thoughts..."
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="post-image"
//             className="block text-gray-700 text-sm font-bold mb-2"
//           >
//             Upload Image (optional)
//           </label>
//           <input
//             type="file"
//             id="post-image"
//             accept="image/*"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             onChange={handleImageChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="post-video"
//             className="block text-gray-700 text-sm font-bold mb-2"
//           >
//             Upload Video (optional)
//           </label>
//           <input
//             type="file"
//             id="post-video"
//             accept="video/*"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             onChange={handleVideoChange}
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Post
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreatePostForm;

// CreatePostForm.jsx

import React, { useState } from 'react';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submitting the post content (e.g., sending to backend)
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    if (video) {
      formData.append('video', video);
    }
    console.log('Submitted data:', formData);

    // Reset form state
    setContent('');
    setImage(null);
    setVideo(null);
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
