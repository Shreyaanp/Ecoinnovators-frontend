import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Screens/Home';
import SignupModal from './Components/SignupModal';
import LoginModal from './Components/LoginModal';


function App() {
  return (
  <Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<SignupModal isOpen={true} onClose={() => {}} />} />
    <Route path="/login" element={<LoginModal isOpen={true} onClose={() => {}} />} />
  </Routes>
</Router>

  );
}

export default App;
