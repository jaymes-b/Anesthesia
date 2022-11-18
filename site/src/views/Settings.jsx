import React from 'react';
import Navbar from '../components/Navbar';
import './Settings.css'

const Settings = () => {
  return (
    <div className="navbar-page">
      <h1>Settings</h1>
      <button type="button">Update Database</button>
      {/* <div>
        Dark Mode
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div> */}
      
      <Navbar activePage={"settings"} />
    </div>
  )
}

export default Settings