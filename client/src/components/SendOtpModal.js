import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../context/Context';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SendOtpModal = () => {
  const { sendotpmodal, setsendotpmodal, setotpmodal, parent } = useContext(Context);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const navigate = useNavigate();

  const closeModal = useCallback(() => {
    setsendotpmodal(false);
    setotpmodal(false); // Ensure that both modals are closed
  }, [setsendotpmodal, setotpmodal]);

  useEffect(() => {
    if (timeLeft === 0) {
      toast.error("OTP has expired");
      closeModal();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, closeModal]);

  if (!sendotpmodal) return null;

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const otpArray = otp.split('');
    otpArray[index] = value;

    const newOtp = otpArray.join('');
    setOtp(newOtp);

    // Focus on next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (otp.length === 6 && password && confirmPassword && password === confirmPassword) {
      fetch('https://techtribe-v65p.onrender.com/api/checkotp', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: parent,
          otp,
          password
        })
      }).then(res => res.json())
        .then(result => {
          if (result.status === 200) {
            closeModal();
            navigate('/signin');
            toast.success("Password has been changed");
          } else {
            toast.error(result.message);
            setsendotpmodal(false);
          }
        })
        .catch(e => {
          console.log(e);
          toast.error(e.message);
          setsendotpmodal(false);
        });
    } else {
      toast.error("Enter the details correctly");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-15 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Enter OTP</h2>
        <p className="text-red-500 mb-4">OTP expires in: {formatTime(timeLeft)}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex justify-between">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                name="otp"
                maxLength="1"
                value={otp[index] || ''}
                onChange={e => handleOtpChange(index, e.target.value)}
                onFocus={e => e.target.select()}
                className="text-gray-500 w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-500 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-gray-500 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default SendOtpModal;
