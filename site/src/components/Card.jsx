import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ imageUrl, bodyPart }) => {
  return (
    <Link to={`/search/${bodyPart}`} className="card">
      <div className="card-image">
        <img src={imageUrl} />
      </div>
      {bodyPart}
    </Link>
  )
}

export default Card