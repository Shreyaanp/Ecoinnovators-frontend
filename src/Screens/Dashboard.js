// Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is not signed in, redirect to login page
        navigate('/login');
      }
      // User is signed in, you can now access the user object
      console.log(user);
    });
  }, [navigate]);

  // ... your dashboard JSX

  return (
    <div>
      {/* Your dashboard UI */}
    </div>
  );
};

export default Dashboard;