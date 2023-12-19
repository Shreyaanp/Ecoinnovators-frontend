import React from 'react';
import './SignupModal.css'; // Make sure to create a SocialSignupModal.css file for styling
import { auth, googleProvider } from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
  if (!isOpen) return null;

  
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info.
      const user = result.user;
      // You can perform additional actions here upon successful login
      console.log('Logged in user:', user);
      onClose();
      navigate('/dashboard'); // Close the modal after successful login
    } catch (error) {
      // Handle Errors here.
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div>
        <h2 className="modal-title">Socials Signups</h2>
        <p className="modal-subtitle">Not registered yet, hop to <a >signup</a>.</p>
        </div>
        <div className='container'>
        <button className="social-button facebook">Login with Facebook</button>
        <button className="social-button google" onClick={handleGoogleLogin}>Login with Google</button>
        <button className="social-button apple">Login with Apple</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
