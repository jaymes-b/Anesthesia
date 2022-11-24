import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import { AlphabetizeList } from '../helpers/AlphabetizeList';
import '../views/ListView.css';

const BlockList = ({ setLoading, setKeyword }) => {
  const [blockList, setBlockList] = useState([]);

  const getBlocks = async () => {
    setLoading(true);
    await axios.get("http://127.0.0.1:5000/api/blocks")
      .then(res => {
        setBlockList(AlphabetizeList(res.data.block_names));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(false);
    setKeyword("");
    getBlocks();
  }, [])

  return (
    <table className="list-items">
      {blockList.map((block, i) => {
        return (
          <Link to={`/block/${block}`} key={i}>
            <tr>
              <td>
                {CapitalizeFirstLetter(block)}
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </td>
            </tr>
          </Link>
        )
      })}
    </table>
  )
}

export default BlockList