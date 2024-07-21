import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context/Context';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';


const OtpModal = () => {
  
  const { otpmodal, setotpmodal, setsendotpmodal,setparent } = useContext(Context);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleAutofill = (event) => {
      if (event.animationName === 'onAutoFillStart') {
        setEmail(document.getElementById('email').value);
      }
    };

    document.getElementById('email').addEventListener('animationstart', handleAutofill);

    return () => {
      document.getElementById('email').removeEventListener('animationstart', handleAutofill);
    };
  }, []);

  

  if (!otpmodal) return null;
  
  const closeModal = () => setotpmodal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      fetch('https://techtribe-v65p.onrender.com/api/sendOtp', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      }).then(res => res.json())
        .then(data => {
          if (data.status === 200){
            setparent(email);
            toast.success(data.message)
            
            setsendotpmodal(true);
          }
          else toast.error(data.message)
        })
        .catch(e => {
          console.log(e);
          toast.error(e.message)
          setotpmodal(false);
        })

    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-900 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              Go Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      
      </div>
    </div>
  );
};

export default OtpModal;
