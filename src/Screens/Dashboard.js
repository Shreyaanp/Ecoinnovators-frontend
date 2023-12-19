// Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ChatWindow from './chatWindow';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is not signed in, redirect to login page
        navigate('/login');
      }
      else{
        console.log(user)
      }
      // User is signed in, you can now access the user object
      console.log(user);
    });
  }, [navigate]);

  return (
    <div>
      <ChatWindow/>
    </div>
  );
};

export default Dashboard;