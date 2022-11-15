import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import { AlphabetizeList } from '../helpers/AlphabetizeList';
import '../views/ListView.css';

const SurgeryList = ({ setLoading, setKeyword }) => {
  const [surgeryList, setSurgeryList] = useState([]);

  const getSurgeries = async () => {
    setLoading(true);
    await axios.get("http://127.0.0.1:5000/api/home")
      .then(res => {
        setSurgeryList(AlphabetizeList(res.data.surgeries));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setKeyword("");
    getSurgeries();
  }, [])

  return (
    <table className="list-items">
      {surgeryList.map(surgery => {
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
      })}
    </table>
  )
}

export default SurgeryList