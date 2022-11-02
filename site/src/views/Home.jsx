import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import DUMMY_DATA from '../dummyData.json';
import './Home.css';

const Home = () => {
  const {bodyPart} = useParams();

  const [surgeryList, setSurgeryList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [keyword, setKeyword] = useState(bodyPart)

  useEffect(() => {
    setSearching(false);
    setSurgeryList(DUMMY_DATA.surgeries);
    setKeyword(bodyPart);

    if (bodyPart !== undefined) {
      setBlockList(DUMMY_DATA.blocks.filter(block => block.bodyPart.includes(bodyPart)));
      setSearching(true);
    } else {
      setKeyword("");
    }
  }, [bodyPart])

  const listSurgeries = (surgery) => {
    return (
      <Link to={`/surgery/${surgery.id}`}>
        <tr>
          <td>
            {CapitalizeFirstLetter(surgery.surgery)}
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </td>
        </tr>
      </Link>
    )
  }

  const listBlocks = (block) => {
    return (
      <Link to={`/block/${block.id}`}>
        <tr>
          <td>
            {CapitalizeFirstLetter(block.block)}
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
          {surgeryList.filter(surgery => surgery.bodyPart === keyword).map(surgery => listSurgeries(surgery))}
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
      {
        searching ?
        searchPage() :
        (
          <table className="list-items">
            {surgeryList.map(surgery => listSurgeries(surgery))}
          </table>
        )
      }
      <Navbar activePage={"home"}/>
    </div>
  )
}

export default Home