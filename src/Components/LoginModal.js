import React from 'react';
import './SignupModal.css'; // Make sure to create a SocialSignupModal.css file for styling

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div>
        <h2 className="modal-title">Socials Signups</h2>
        <p className="modal-subtitle">Not registered yet, hop to <a >signup</a>.</p>
        </div>
        <div className='container'>
        <button className="social-button facebook">Login with Facebook</button>
        <button className="social-button google">Login with Google</button>
        <button className="social-button apple">Login with Apple</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
