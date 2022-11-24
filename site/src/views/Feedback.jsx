import React from 'react';
import Navbar from '../components/Navbar';
import './Feedback.css'

const Feedback = () => {
  return (
    <div>
      <h1>Feedback</h1>
      <textarea rows="5" cols="100"/>
      <button type="button">Submit</button>
      <Navbar activePage={"feedback"} />
    </div>
  )
}

export default Feedback