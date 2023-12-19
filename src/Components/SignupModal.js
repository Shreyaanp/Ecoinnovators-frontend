import React from 'react';
import './SignupModal.css'; // Make sure to create a SocialSignupModal.css file for styling
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { auth, googleProvider, database} from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { ref, set } from 'firebase/database';


const SignupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Get user details
      const userProfile = {
          firstName: user.displayName.split(' ')[0], // Assuming the first name is the first part
          lastName: user.displayName.split(' ')[1] || '', // Assuming the last name is the second part
          email: user.email
      };

      // Get a reference to the database
      const userRef = ref(database, 'users/' + user.uid);

      // Write the user data to the database
      set(userRef, userProfile)
          .then(() => {
              console.log('User data stored successfully!');
              onClose(); // Close the modal upon successful data storage
          })
          .catch((error) => {
              console.error('Storing user data failed: ', error);
          });

  } catch (error) {
      console.error(error);
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
