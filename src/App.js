import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Screens/Home';
import SignupModal from './Components/SignupModal';
import LoginModal from './Components/LoginModal';
import Dashboard from './Screens/Dashboard'; 


function App() {
  return (
  <Router>
  <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
</Router>

  );
}

export default App;
