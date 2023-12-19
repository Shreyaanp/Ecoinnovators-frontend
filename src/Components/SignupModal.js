import React from 'react';
import './SignupModal.css'; // Make sure to create a SocialSignupModal.css file for styling
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";


const SignupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <div>
      <h2 className="modal-title">Socials Signups</h2>
      <p className="modal-subtitle">Already registered, hop to <a>login</a>.</p>
      </div>
      <div className='container'>
      <button className="social-button facebook"><FaFacebook />Signup with Facebook</button>
      <button className="social-button google"><FaGoogle />Signup with Google</button>
      <button className="social-button apple"><FaApple />Signup with Apple</button>
      </div>
    </div>
  </div>
  );
};

export default SignupModal;
