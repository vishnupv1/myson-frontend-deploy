import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import companyLogo from '../../assets/images/CompanyLogo.png';

const FooterComponent: React.FC = () => {
  return (
    <footer style={{ padding: '0px 0px', backgroundColor: '#333', color: '#fff' }}>
      <div id="last">
        {/* Logo and description on the left */}
        <section id="footer-logo">
          <img src={companyLogo} alt="Company Logo" className="image-fluid" />
          <p
            style={{
              width: '100%',
              // whiteSpace: 'nowrap',
              fontWeight: 'normal',
              color: 'lightgray',
            }}
          >
            Since our establishment in 2018, MYSON has swiftly risen as India's leading hub for pet
            parents. With a wide array of furniture and kitchenwares, we fulfill all your kitchen
            requirements with unparalleled quality and attention. With a presence in 2 physical
            retail outlets spanning Kerala, we're continually expanding our reach to serve you
            better.
          </p>
        </section>

        {/* Links */}
        <section id="links">
          <h5 className="footer-links" style={{ color: '#fff' }}>Links</h5>
          <ul>
            <li style={{ color: '#fff' }}>Kitchen</li>
            <li style={{ color: '#fff' }}>Furniture</li>
            <li style={{ color: '#fff' }}>Shops</li>
          </ul>
        </section>

        {/* Contact Us */}
        <section id="contact-us">
          <h5 className="footer-contact" style={{ color: '#fff' }}>Contact Us</h5>
          <ul>
            <li style={{ marginBottom: '8px', color: '#fff' }}>Call Us at +91 9447458735</li>
            <li style={{ marginBottom: '8px', color: '#fff' }}>www.myson.in</li>
            <li style={{ marginBottom: '8px' }}>
              <div
                style={{
                  listStyle: 'none',
                  gap: '10px',
                  display: 'flex',
                  marginTop: '25px',
                  justifyContent: 'center',
                }}
              >
                <a href="https://www.facebook.com/share/1AZUciqVzA/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} style={{ color: 'white' }} />
                </a>
                <a href="https://youtube.com/@myson-planet?si=nABCxjp6FmJyIi5u" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faYoutube} style={{ color: 'white' }} />
                </a>
                <a href="https://www.instagram.com/mysonfoodcaredisplaysolutions/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} style={{ color: 'white' }} />
                </a>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <h6 style={{ color: 'lightgray' }}>© 2024 MYSON Private Limited</h6>
    </footer>
  );
};

export default FooterComponent;
