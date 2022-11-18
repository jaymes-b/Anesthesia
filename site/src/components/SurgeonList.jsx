import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../views/ListView.css';

const SurgeonList = ({ setLoading, setKeyword }) => {
  const [surgeonList, setSurgeonList] = useState([]);

  const getSurgeons = async () => {
    setLoading(true);
    await axios.get("http://127.0.0.1:5000/api/surgeons")
      .then(res => {
        console.log(res.data)
        setBlockList(AlphabetizeList(res.data.block_names));
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
      {surgeonList.map(surgeon => {
        return (
          <Link to={`/surgeon/${surgeon}`}>
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