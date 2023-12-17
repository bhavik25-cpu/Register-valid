import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/SignUp';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';

function App() {
  return (
    
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/user-profile" element={<UserProfile />} /> {/* New route for user profile */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
