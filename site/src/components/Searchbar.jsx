import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Searchbar.css';

const Searchbar = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(searchTerm);

  useEffect(() => {
    setKeyword(searchTerm);
  }, [searchTerm])
  

  const searchOnChange = (event) => {
    setKeyword(event.target.value);
  }

  const searchOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      search();
    }
  }

  const search = () => {
    if (keyword === "") {
      navigate("/");
    } else {
      navigate(`/search/${keyword}`);
    }
  }

  return (
    <input 
      type="search"
      placeholder="Search term..."
      className="searchbar"
      value={keyword === undefined ? null : keyword}
      onChange={searchOnChange}
      onKeyDown={searchOnKeyDown}
    />
  )
}

export default Searchbar