import { useLocation, Link } from 'react-router-dom';
import { STUDIO_CONFIG } from '../config/studio-config';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  
  // Hide footer on specific pages
  const hideFooterOn = ['/login', '/register', '/admin'];
  const isHidden = hideFooterOn.includes(location.pathname);

  if (isHidden) return null;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-section brand-info">
            <h2 className="footer-logo">
              <span className="logo-icon">✨</span>
              <span className="logo-text">{STUDIO_CONFIG.brand.name}</span>
            </h2>
            <p className="footer-tagline">
              {STUDIO_CONFIG.brand.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/saree/select">Saree Customizer</Link></li>
              <li><Link to="/half-saree/select">Half Saree Wizard</Link></li>
              <li><Link to="/lehanga/select">Lehanga Atelier</Link></li>
              <li><Link to="/admin" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>🔒 Management Login</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-section contact-info">
            <h3 className="footer-title">Contact Information</h3>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">👤</span>
                <div className="contact-text">
                  <strong>Founder:</strong> {STUDIO_CONFIG.contact.founder}
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-text">
                  <strong>Primary:</strong> {STUDIO_CONFIG.contact.primaryPhone}
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div className="contact-text">
                  <strong>Secondary:</strong> {STUDIO_CONFIG.contact.secondaryPhone}
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <div className="contact-text">
                  <strong>Website:</strong> <a href={`https://${STUDIO_CONFIG.contact.website}`} style={{ color: 'inherit', textDecoration: 'none' }}>{STUDIO_CONFIG.contact.website}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 {STUDIO_CONFIG.brand.name}. Built with passion for your elegance.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
