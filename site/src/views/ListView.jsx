import React, { useState, useEffect, cloneElement } from 'react';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import './ListView.css';

const ListView = ({ children, navIcon }) => {
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState(navIcon || "");

  useEffect(() => {
    
  }, [])
  console.log(window.history.state)

  const childrenWithProps = React.Children.map(children, child => {
    return cloneElement(child, {setLoading, setKeyword, loading})
  });

  return (
    <div>
      <Searchbar searchTerm={keyword}/>
      {loading ? "Loading" : null}
      {childrenWithProps}
      <Navbar activePage={navIcon}/>
    </div>
  )
}

export default ListView