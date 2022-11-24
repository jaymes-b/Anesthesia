import React from 'react';
import { Link } from 'react-router-dom';
import { faHeartPulse, faImage, faCommentDots, faSyringe, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Navbar.css';

const Navbar = ({ activePage }) => {
  return (
    <nav className="navbar">
      <Link to="/" className={activePage === "surgeries" ? "active" : ""}>
        <FontAwesomeIcon 
          icon={faHeartPulse}
          size="2x" />
        <p className="navbar-label">Surgeries</p>
      </Link>
      <Link to="/blocks" className={activePage === "blocks" ? "active" : ""}>
        <FontAwesomeIcon 
          icon={faSyringe}
          size="2x" />
        <p className="navbar-label">Blocks</p>
      </Link>
      <Link to="/surgeons" className={activePage === "surgeons" ? "active" : ""}>
        <FontAwesomeIcon 
          icon={faUserDoctor}
          size="2x" />
        <p className="navbar-label">Surgeons</p>
      </Link>
      <Link to="/anatomy" className={activePage === "anatomy" ? "active" : ""}>
        <FontAwesomeIcon 
          icon={faImage}
          size="2x" />
          <p className="navbar-label">Anatomy</p>
      </Link>
      <Link to="/feedback" className={activePage === "feedback" ? "active" : ""}>
        <FontAwesomeIcon 
          icon={faCommentDots}
          size="2x" />
          <p className="navbar-label">Feedback</p>
      </Link>
    </nav>
  )
}

export default Navbar