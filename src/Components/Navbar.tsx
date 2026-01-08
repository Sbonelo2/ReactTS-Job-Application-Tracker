import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      setCurrentUser(null);
    }
  }, [location]); // Update when location changes

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
    setIsMenuOpen(false);
  };

  // Don't show navbar on landing page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={currentUser ? "/Home" : "/"} className="navbar-logo">
          <span className="logo-icon">💻</span>
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
          {currentUser ? (
            <>
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
              
              <div className="user-info">
                <span className="user-name">Welcome, {currentUser.name}</span>
              </div>
              
              <button 
                onClick={handleLogout}
                className="nav-link logout-btn"
              >
                <span className="nav-icon">🚪</span>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">🏠</span>
                Home
              </Link>
              
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">🔑</span>
                Login
              </Link>
              
              <Link 
                to="/registration" 
                className={`nav-link nav-link-cta ${isActive('/registration') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">✏️</span>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
