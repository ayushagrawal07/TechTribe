import React, { useContext } from 'react';
import Modal from 'react-modal';
import { RiLogoutCircleLine, RiCloseCircleLine } from 'react-icons/ri'; // Importing icons from react-icons
import { ImCross } from "react-icons/im";
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    width: '400px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    background: 'white', 
    position: 'relative', 
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: '1000',
  },
};

const LogoutModal = () => {
  const {modal,setmodal,setlogin} = useContext(Context);
  const navigate = useNavigate();
  return (
    <Modal
      isOpen={modal}
      style={customModalStyles}
      ariaHideApp={false} // Disables the app element warning in development
    >
      <button
        onClick={()=>setmodal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <ImCross size={20} />
      </button>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
        <p className="text-gray-700 mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-center">
          <button
            onClick={()=>setmodal(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2 hover:bg-gray-300 focus:outline-none"
          >
            <RiCloseCircleLine className="inline-block mr-2" /> Cancel
          </button>
          <button
            onClick={()=>{
              
              setmodal(false);
              setlogin(false);
              localStorage.clear()
              
              navigate("/signin")
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
          >
            <RiLogoutCircleLine className="inline-block mr-2" /> Logout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
