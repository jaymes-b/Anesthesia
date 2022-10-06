import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './PageBar.css';

const PageBar = ({ pageTitle }) => {
  const navigate = useNavigate();
  return (
    <div className="page-bar">
      <button onClick={() => navigate(-1)} className="page-bar-button">
        <FontAwesomeIcon icon={faChevronLeft} size="xl" />
      </button>
      {pageTitle}
    </div>
  )
}

export default PageBar