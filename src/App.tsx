import React from 'react';
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
// import Home from './Pages/Home';
import Home from './Pages/Home';
import Jobs from './Pages/Jobs';
import Page404 from './Pages/Page404';
import Registration from './Pages/Registration';

function App() {
  return (
    <Router>
     
      <Navbar />

      
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        
        <Route path="*" element={<Page404 />} />
      </Routes>

      
      <Footer />
    </Router>
  );
}

export default App;

