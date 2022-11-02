import React from 'react';
import { Link } from 'react-router-dom';
import { faHome, faImage, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Navbar.css';

const Navbar = ({ activePage }) => {
  return (
    <nav className="navbar">
      <Link to="/" className={activePage === "home" ? "active" : ""}>
        <FontAwesomeIcon 
          icon={faHome}
          size="2x" />
        <p className="navbar-label">Home</p>
      </Link>
      <Link to="/anatomy" className={activePage === "anatomy" ? "active" : ""}>
        <FontAwesomeIcon 
          icon={faImage}
          size="2x" />
          <p className="navbar-label">Anatomy</p>
      </Link>
      <Link to="/settings" className={activePage === "settings" ? "active" : ""}>
        <FontAwesomeIcon 
          icon={faGear}
          size="2x" />
          <p className="navbar-label">Settings</p>
      </Link>
    </nav>
  )
}

export default Navbar