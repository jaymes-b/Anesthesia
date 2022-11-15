import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import { AlphabetizeList } from '../helpers/AlphabetizeList';
import '../views/ListView.css';

const Search = ({ setLoading, setKeyword, loading }) => {
  const {bodyPart} = useParams();

  const [surgeryList, setSurgeryList] = useState([]);
  const [blockList, setBlockList] = useState([]);

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
    setSurgeryList([]);
    setBlockList([]);
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

  return (
    <>
      {loading ? null : (
        <>
          <h3 className="category-heading">Surgeries</h3>
          <table className="list-items">
            {surgeryList.length === 0 ? "No search results found" : surgeryList.map(surgery => listSurgeries(surgery))}
          </table>
          <h3 className="category-heading">Blocks</h3>
          <table className="list-items">
            {blockList.length === 0 ? "No search results found" : blockList.map(block => listBlocks(block))}
          </table>
        </>
      )}
    </>
  )
}

export default Search