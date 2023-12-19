import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Screens/Home';
import SignupModal from './Components/SignupModal';
import LoginModal from './Components/LoginModal';
import ChatWindow from './Screens/chatWindow';

function App() {
  return (
  <Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<SignupModal isOpen={true} onClose={() => {}} />} />
    <Route path="/login" element={<LoginModal isOpen={true} onClose={() => {}} />} />
    <Route path='/chatwindow' element={<ChatWindow />} />
  </Routes>
</Router>

  );
}

export default App;
