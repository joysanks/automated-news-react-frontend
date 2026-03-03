import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-links">
            <Link to="/privacy-policy">Privacy</Link>
            <span style={{ margin: "0 5px" }}>|</span>
            <Link to="/about">About</Link>
          </div>
          <div className="social-icons">
            <a href="https://x.com/NirmanWeb" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a
              href="https://facebook.com/nirmanweb"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/nirmanweb"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container nav-container">
          <Link to="/" className="logo">
            <h3>NirmanWeb</h3>
          </Link>

          {/* Desktop Nav */}
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink to="/category/tech">Tech</NavLink>
              </li>
              <li>
                <NavLink to="/category/entertainment">Entertainment</NavLink>
              </li>
              <li>
                <NavLink to="/category/exams">Exams</NavLink>
              </li>
              <li>
                <NavLink to="/category/others">Others</NavLink>
              </li>

              {/* <li>
                <NavLink to="/category/how-to">How To</NavLink>
              </li> */}
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/category/tech" onClick={closeMenu}>
          Technology
        </Link>
        <Link to="/category/entertainment" onClick={closeMenu}>
          Entertainment
        </Link>
        <Link to="/category/exams" onClick={closeMenu}>
          Exams &amp; Education
        </Link>
        <Link to="/category/how-to" onClick={closeMenu}>
          How To Guides
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About Us
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact Us
        </Link>
        <Link to="/privacy-policy" onClick={closeMenu}>
          Privacy Policy
        </Link>
      </div>
    </>
  );
};

export default Header;
