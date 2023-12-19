import React from 'react';
import './SignupModal.css'; // Make sure to create a SocialSignupModal.css file for styling
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


const SignupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      onClose(); // Close the modal upon successful login
    } catch (error) {
      console.error(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };


  return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <div>
      <h2 className="modal-title">Socials Signups</h2>
      <p className="modal-subtitle">Already registered, hop to <a>login</a>.</p>
      </div>
      <div className='container'>
      <button className="social-button facebook"><FaFacebook />Signup with Facebook</button>
      <button className="social-button google" onClick={handleGoogleSignup}><FaGoogle />Signup with Google</button>
      <button className="social-button apple"><FaApple />Signup with Apple</button>
      </div>
    </div>
  </div>
  );
};

export default SignupModal;
