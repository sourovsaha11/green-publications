import { Link } from 'react-router-dom';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { MdPhone, MdLocationOn } from 'react-icons/md';
import './Footer.css';

const PHONE   = '01923507973';
const FB_LINK = 'https://www.facebook.com/share/1ETaTwSJU1/';

const Footer = () => (
  <footer className="footer">
    <div className="container footer__grid">

      {/* Brand */}
      <div className="footer__brand">
        <img src="/logo.png" alt="Green Publications" className="footer__logo" />
        <p className="footer__tagline">
          Bangladesh's leading publisher of career and professional development books.
          Helping graduates and professionals reach their full potential since 2019.
        </p>
        <div className="footer__social">
          <a href={FB_LINK} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook /></a>
          <a href={`https://wa.me/88${PHONE}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
        </div>
      </div>

      {/* Explore */}
      <div className="footer__col">
        <h4 className="footer__heading">Explore</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="footer__col">
        <h4 className="footer__heading">Contact</h4>
        <ul className="footer__contact-list">
          <li>
            <MdPhone />
            <a href={`tel:${PHONE}`}>{PHONE}</a>
          </li>
          <li>
            <FaFacebook />
            <a href={FB_LINK} target="_blank" rel="noreferrer">Green Publications</a>
          </li>
          <li>
            <MdLocationOn />
            <span>40/2 Purana Paltan, Level-3,<br />Dhaka-1000, Bangladesh</span>
          </li>
        </ul>
      </div>

    </div>

    {/* Bottom bar */}
    <div className="footer__bottom">
      <div className="container footer__bottom-inner">
        <span>© 2026 Green Publications. All rights reserved.</span>
        <Link to="/admin/login" className="footer__admin-link">Admin</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
