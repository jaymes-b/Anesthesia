import React, { useState, useEffect } from 'react';
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Confirmation from '../components/Confirmation';
import './Feedback.css'

const Feedback = () => {
  const DEFAULT_ERROR_MSG = "Sorry we ran into an error, please try again later!";

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR_MSG);
  const [sourcePage, setSourcePage] = useState("");
  const [feedback, setFeedback] = useState("");

  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/feedbacktext")
      .then(res => {
        setFeedbackText(CapitalizeFirstLetter(res.data.feedback_text))
      })
  }, [])
  

  const submitFeedback = async () => {
    setSubmitted(false);
    if (feedback === "") {
      setErrorMessage("You can't have empty feedback, please write something in the textbox!");
      setError(true);
    }
    else {
      await axios.get(`http://127.0.0.1:5000/api/feedback?sourcePage=${sourcePage}&comments=${feedback}`)
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
      <p>{feedbackText}</p>
      <select className="feedback-dropdown" onChange={(e) => { setSourcePage(e.target.value) }} value={sourcePage}>
        <option value="">-- Select page for feedback --</option>
        <option value="surgeries">Surgeries list</option>
        <option value="blocks">Blocks list</option>
        <option value="surgeons">Surgeons list</option>
        <option value="anatomy">Anatomy</option>
        <option value="surgery">Surgery</option>
        <option value="block">Block</option>
        <option value="surgeon">Surgeon</option>
        <option value="other">Other</option>
      </select>
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