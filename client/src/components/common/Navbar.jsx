import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import './Navbar.css';

const PHONE   = '01923507973';
const FB_LINK = 'https://www.facebook.com/share/1ETaTwSJU1/';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src="/logo.png" alt="Green Publications" className="navbar__logo-img" />
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          {[['/', 'Home'], ['/books', 'Books'], ['/contact', 'Contact']].map(([path, label]) => (
            <li key={path}>
              <Link to={path} className={`navbar__link ${isActive(path) ? 'navbar__link--active' : ''}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social icons */}
        <div className="navbar__social">
          <a href={FB_LINK} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook /></a>
          <a href={`https://wa.me/88${PHONE}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
        </div>

        {/* Mobile hamburger */}
        <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          {[['/', 'Home'], ['/books', 'Books'], ['/contact', 'Contact']].map(([path, label]) => (
            <Link key={path} to={path} className="navbar__mobile-link">{label}</Link>
          ))}
          <div className="navbar__mobile-socials">
            <a href={FB_LINK} target="_blank" rel="noreferrer"><FaFacebook /> Facebook</a>
            <a href={`https://wa.me/88${PHONE}`} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
