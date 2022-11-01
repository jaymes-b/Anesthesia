import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import DUMMY_DATA from '../dummyData.json';
import './Home.css';

const Home = () => {
  const {bodyPart} = useParams();

  const [surgeryList, setSurgeryList] = useState([]);
  const [keyword, setKeyword] = useState(bodyPart) // should be undefined for no search term

  useEffect(() => {
    setSurgeryList(DUMMY_DATA.surgeries);
    setKeyword(bodyPart);
  }, [bodyPart])

  const listSurgeries = (surgery) => {
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
  }

  return (
    <div>
      <Searchbar searchTerm={keyword} />
      <table className="list-items">
        {keyword === undefined ? surgeryList.map(surgery => listSurgeries(surgery)) : 
        surgeryList.filter(surgery => surgery.bodyPart === keyword).map(surgery => listSurgeries(surgery))}
      </table>
      <Navbar activePage={"home"}/>
    </div>
  )
}

export default Home