import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Confirmation from '../components/Confirmation';
import './Feedback.css'

const Feedback = () => {
  const DEFAULT_ERROR_MSG = "Sorry we ran into an error, please try again later!";

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR_MSG);
  const [feedback, setFeedback] = useState("");

  const submitFeedback = async () => {
    setSubmitted(false);
    if (feedback === "") {
      setErrorMessage("You can't have empty feedback, please write something in the textbox!");
      setError(true);
    }
    else {
      await axios.get(`http://127.0.0.1:5000/api/feedback?comments=${feedback}`)
      .then(res => {
        if (res) {
          setError(false);
          setSubmitted(true);
        }
        else setError(true);
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(DEFAULT_ERROR_MSG);
        setError(true);
      })
    }
  }

  return (
    <div className="feedback-page">
      <h1>Feedback</h1>
      <textarea rows="10" onChange={(e) => {setFeedback(e.target.value)}}/>
      <div className="feedback-page-row">
        <button type="button" onClick={submitFeedback}>Submit</button>
        <p className="red-text">{error ? errorMessage : null}</p>
      </div>
      {submitted ? <Confirmation /> : null}
      <Navbar activePage={"feedback"} />
    </div>
  )
}

export default Feedback