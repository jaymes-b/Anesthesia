import React from 'react';
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Accordion.css';

const Accordion = ({ labelName, children }) => {
  const showLinks = (e) => {
    const block = e.target;
    block.classList.toggle("active-accordion");
    const links = block.nextElementSibling;
    if (links.classList.contains("accordion-panel")) {
      if (links.style.display === "block") {
        links.style.display = "none";
      } else {
        links.style.display = "block";
      }
    }
  }

  return (
    <>
      <button className="accordion-label" onClick={showLinks}>
        {labelName}
        <FontAwesomeIcon icon={faChevronRight} className="closed-accordion" />
        <FontAwesomeIcon icon={faChevronDown} className="open-accordion" />
      </button>
      <div className="accordion-panel">
        {children}
      </div>
    </>
  )
}

export default Accordion