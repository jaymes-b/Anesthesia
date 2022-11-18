import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import { AlphabetizeList } from '../helpers/AlphabetizeList';
import '../views/ListView.css';

const SurgeonList = ({ setLoading, setKeyword }) => {
  const [surgeonList, setSurgeonList] = useState([]);

  const getSurgeons = async () => {
    setLoading(true);
    await axios.get("http://127.0.0.1:5000/api/surgeons")
      .then(res => {
        setSurgeonList(AlphabetizeList(res.data.surgeon_names));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(false);
    setKeyword("");
    getSurgeons();
  }, [])

  return (
    <table className="list-items">
      {surgeonList.map((surgeon, i) => {
        return (
          <Link to={`/surgeon/${surgeon}`} key={i}>
            <tr>
              <td>
                {CapitalizeFirstLetter(surgeon)}
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </td>
            </tr>
          </Link>
        )
      })}
    </table>
  )
}

export default SurgeonList