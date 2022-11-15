import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../views/ListView.css';

const SurgeonList = ({ setLoading, setKeyword }) => {
  useEffect(() => {
    setLoading(false);
    setKeyword("");
  }, [])

  return (
    <table className="list-items">
      <Link to={"#"}>
        <tr>
          <td>
            Stephen Yang
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </td>
        </tr>
      </Link>
      <Link to={"#"}>
        <tr>
          <td>
            Dean Wang
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </td>
        </tr>
      </Link>
    </table>
  )
}

export default SurgeonList