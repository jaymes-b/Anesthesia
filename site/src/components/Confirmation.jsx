import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  const navigate = useNavigate();

  const goBack = () => {
    console.log("h")
    return navigate('/');
  }

  return (
    <div className="modal-container">
      <div className="feedback-confirmation">
        <h2>Thank you!</h2>
        <p>Your feedback has been submitted and will be taken into consideration! In the meantime, please continue to use our application.</p>
        <button onClick={goBack}>Got It</button>
      </div>
    </div> 
  )
}

export default Confirmation