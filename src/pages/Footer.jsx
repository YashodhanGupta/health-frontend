import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Yashodhan Gupta. All rights reserved.</p>
        <div className="social-links">
          <a href="https://github.com/YashodhanGupta" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href="https://www.linkedin.com/in/yashodhan-gupta-9a794a245" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;