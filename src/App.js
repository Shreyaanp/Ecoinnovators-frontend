import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Screens/Home';
import SignupModal from './Components/SignupModal';
import LoginModal from './Components/LoginModal';

import Dashboard from './Screens/Dashboard';
import LandingPage from './Screens/LandingPage';

function App() {
  return (
  <Router>
  <Routes>
  <Route path="/" element={<LandingPage />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/signup" element={<SignupModal isOpen={true} onClose={() => {}} />} />
    <Route path="/login" element={<LoginModal isOpen={true} onClose={() => {}} />} />
    <Route path='/dashboard' element={<Dashboard />} />
  </Routes>
</Router>

  );
}

export default App;
