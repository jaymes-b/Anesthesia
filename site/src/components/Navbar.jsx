import React from 'react';
import { Link } from 'react-router-dom';
import { faHome, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Navbar.css';

const Navbar = ({ activePage }) => {
  return (
    <nav className="navbar">
      <Link to="/">
        <FontAwesomeIcon 
          icon={faHome}
          size="xl"
          className={activePage === "home" ? "active" : ""} />
      </Link>
      <Link to="/anatomy">
        <FontAwesomeIcon 
          icon={faImage}
          size="xl"
          className={activePage === "anatomy" ? "active" : ""} />
      </Link>
    </nav>
  )
}

export default Navbar