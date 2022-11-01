import React from 'react';
import { Link } from 'react-router-dom';
import { faHome, faImage, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Navbar.css';

const Navbar = ({ activePage }) => {
  return (
    <nav className="navbar">
      <Link to="/">
        <FontAwesomeIcon 
          icon={faHome}
          size="2x"
          className={activePage === "home" ? "active" : ""} />
      </Link>
      <Link to="/anatomy">
        <FontAwesomeIcon 
          icon={faImage}
          size="2x"
          className={activePage === "anatomy" ? "active" : ""} />
      </Link>
      <Link to="/settings">
        <FontAwesomeIcon 
          icon={faGear}
          size="2x"
          className={activePage === "settings" ? "active" : ""} />
      </Link>
    </nav>
  )
}

export default Navbar