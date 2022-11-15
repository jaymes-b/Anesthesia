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
            Interscalene single-shot
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </td>
        </tr>
      </Link>
      <Link to={"#"}>
        <tr>
          <td>
            Adductor canal continuous catheter
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </td>
        </tr>
      </Link>
      <Link to={"#"}>
        <tr>
          <td>
            Thoracic epidural
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </td>
        </tr>
      </Link>
    </table>
  )
}

export default SurgeonList