import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import companyLogo from '../../assets/images/CompanyLogo.png';
import './FooterComponent.css'; // Import the new CSS file

const FooterComponent: React.FC = () => {
  return (
    <footer className="footer-container"> {/* Apply the main footer class */}
      <div className="footer-section footer-logo-section"> {/* Apply new class names */}
        <img src={companyLogo} alt="Company Logo" className="image-fluid" />
        <p>
          Since our establishment in 2018, MYSON has swiftly risen as India's leading hub for pet
          parents. With a wide array of furniture and kitchenwares, we fulfill all your kitchen
          requirements with unparalleled quality and attention. With a presence in 2 physical
          retail outlets spanning Kerala, we're continually expanding our reach to serve you
          better.
        </p>
        <div className="footer-social-icons"> {/* Apply new class name */}
          <a href="https://www.facebook.com/share/1AZUciqVzA/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://youtube.com/@myson-planet?si=nABCxjp6FmJyIi5u" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://www.instagram.com/mysonfoodcaredisplaysolutions/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>

      <div className="footer-section"> {/* Apply new class name */}
        <h5>Links</h5>
        <ul>
          <li><a href="#">Kitchen</a></li>
          <li><a href="#">Furniture</a></li>
          <li><a href="#">Shops</a></li>
        </ul>
      </div>

      <div className="footer-section"> {/* Apply new class name */}
        <h5>Contact Us</h5>
        <ul>
          <li>Call Us at +91 9447458735</li>
          <li><a href="mailto:info@myson.in">www.myson.in</a></li>
        </ul>
      </div>
      <h6 className="footer-bottom-text">© 2024 MYSON Private Limited</h6> {/* Apply new class name */}
    </footer>
  );
};

export default FooterComponent;
