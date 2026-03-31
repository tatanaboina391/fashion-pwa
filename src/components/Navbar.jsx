import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) return null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">✨</span>
          <span className="logo-text">Fashion Studio</span>
        </Link>
        
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/login" className="navbar-link navbar-link-cta" onClick={closeMenu}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
