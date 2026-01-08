import React from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
// import Home from './Pages/Home';
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import Landing from "./Pages/Landing";
import Page404 from "./Pages/Page404";
import Registration from "./Pages/Registration";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        
        {/* Protected Routes */}
        <Route path="/Home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
