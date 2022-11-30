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
  const [surgeonsList, setSurgeonsList] = useState([]);

  const getSearch = async (searchTerm) => {
    setLoading(true);
    await axios.get(`http://127.0.0.1:5000/api/search?query=${searchTerm}`)
      .then(res => {
        setBlockList(AlphabetizeList(res.data.blocks_data.rows));
        setSurgeryList(AlphabetizeList(res.data.surgeries_data.rows));
        setSurgeonsList(AlphabetizeList(res.data.surgeons_data.surgeon_names))
        
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setSurgeryList([]);
    setBlockList([]);
    getSearch(bodyPart);
    setKeyword(bodyPart);
  }, [bodyPart])

  const listSurgeries = (surgery, i) => {
    return (
      <Link to={`/surgery/${surgery}`} key={`surgery${i}`}>
        <tr>
          <td>
            {CapitalizeFirstLetter(surgery)}
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </td>
        </tr>
      </Link>
    )
  }

  const listBlocks = (block, i) => {
    return (
      <Link to={`/block/${block}`} key={`block${i}`}>
        <tr>
          <td>
            {CapitalizeFirstLetter(block)}
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </td>
        </tr>
      </Link>
    )
  }

  const listSurgeons = (surgeon, i) => {
    return (
      <Link to={`/surgeon/${surgeon}`} key={`surgeon${i}`}>
        <tr>
        <td>
            {surgeon}
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
            {surgeryList.length === 0 ? "No search results found" : surgeryList.map((surgery, i) => listSurgeries(surgery, i))}
          </table>
          <h3 className="category-heading">Blocks</h3>
          <table className="list-items">
            {blockList.length === 0 ? "No search results found" : blockList.map((block, i) => listBlocks(block, i))}
          </table>
          <h3 className="category-heading">Surgeons</h3>
          <table className="list-items">
            {surgeonsList.length === 0 ? "No search results found" : surgeonsList.map((surgeon, i) => listSurgeons(surgeon, i))}
          </table>
        </>
      )}
    </>
  )
}

export default Search