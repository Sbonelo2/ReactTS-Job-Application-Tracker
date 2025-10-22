import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/Home" className="navbar-logo">
          <span className="logo-icon">📋</span>
          <span className="logo-text">Job Tracker</span>
        </Link>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/Home" 
            className={`nav-link ${isActive('/Home') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          
          <Link 
            to="/jobs" 
            className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">💼</span>
            Jobs
          </Link>
          
          <div className="nav-divider"></div>
          
          <Link 
            to="/login" 
            className={`nav-link ${isActive('/login') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">🔐</span>
            Login
          </Link>
          
          <Link 
            to="/registration" 
            className={`nav-link nav-link-cta ${isActive('/registration') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">✨</span>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
