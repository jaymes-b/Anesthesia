import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import { AlphabetizeList } from '../helpers/AlphabetizeList';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import './Home.css';

const Home = () => {
  const [surgeryList, setSurgeryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSurgeries = async () => {
    setLoading(true);
    await axios.get("http://127.0.0.1:5000/api/home")
      .then(res => {
        setSurgeryList(AlphabetizeList(res.data.surgeries));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getSurgeries();
  }, [])

  const listSurgeries = (surgery) => {
    return (
      <Link to={`/surgery/${surgery}`}>
        <tr>
          <td>
            {CapitalizeFirstLetter(surgery)}
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </td>
        </tr>
      </Link>
    )
  }

  return (
    <div>
      <Searchbar />
      {loading ? "Loading" : (
        <table className="list-items">
          {surgeryList.map(surgery => listSurgeries(surgery))}
        </table>
      )}
      <Navbar activePage={"home"}/>
    </div>
  )
}

export default Home