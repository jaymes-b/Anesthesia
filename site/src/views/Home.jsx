import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import DUMMY_DATA from '../dummyData.json';
import './Home.css';

const Home = () => {
  const [surgeryList, setSurgeryList] = useState([]);

  useEffect(() => {
    setSurgeryList(DUMMY_DATA.surgeries);
  }, [])

  return (
    <div>
      <Searchbar />
      <table className="list-items">
        {surgeryList.map(surgery => {
          return (
            <Link to={`/surgery/${surgery.id}`}>
              <tr>
                <td>
                  {surgery.surgery}
                  <FontAwesomeIcon icon={faChevronRight} size="lg" />
                </td>
              </tr>
            </Link>
          )
        })}
      </table>
      <Navbar activePage={"home"}/>
    </div>
  )
}

export default Home