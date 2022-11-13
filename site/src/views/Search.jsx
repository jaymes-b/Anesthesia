import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import { AlphabetizeList } from '../helpers/AlphabetizeList';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import './Home.css';

const Search = () => {
  const {bodyPart} = useParams();

  const [surgeryList, setSurgeryList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(bodyPart)

  const getSearch = async (searchTerm) => {
    setLoading(true);
    await axios.get(`http://127.0.0.1:5000/api/search?query=${searchTerm}`)
      .then(res => {
        setBlockList(AlphabetizeList(res.data.blocks_data.rows));
        setSurgeryList(AlphabetizeList(res.data.surgeries_data.rows));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getSearch(bodyPart);
    setKeyword(bodyPart);

    if (bodyPart === undefined) {
      // set home icon to active, make diff api call, etc.
    }
  }, [bodyPart])

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

  const listBlocks = (block) => {
    return (
      <Link to={`/block/${block}`}>
        <tr>
          <td>
            {CapitalizeFirstLetter(block)}
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </td>
        </tr>
      </Link>
    )
  }

  const searchPage = () => {
    return (
      <>
        <h3>Surgeries</h3>
        <table className="list-items">
          {surgeryList.map(surgery => listSurgeries(surgery))}
        </table>
        <h3>Blocks</h3>
        <table className="list-items">
          {blockList.map(block => listBlocks(block))}
        </table>
      </>
    )
  }

  return (
    <div>
      <Searchbar searchTerm={keyword} />
      {loading ? "Loading" : searchPage()}
      <Navbar activePage={"anatomy"}/>
    </div>
  )
}

export default Search