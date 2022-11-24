import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import PageBar from '../components/PageBar';
import './DetailsPage.css';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';

const Block = () => {
  const { blockId } = useParams();
  const [block, setBlock] = useState({});
  const [loading, setLoading] = useState(true);

  const getBlock = async () => {
    setLoading(true);
    await axios.get(`http://127.0.0.1:5000/api/block?BlockName=${blockId}`)
      .then(res => {
        setBlock(res.data.rows[0] || {});
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getBlock();
  }, [blockId])

  return (
    <div className="details-page pagebar-page">
      <PageBar pageTitle={CapitalizeFirstLetter(block?.Name) || ""}/>
      {loading ? <Spinner /> : Object.keys(block).length === 0 ? "No information found" : (
        <>
          <img src={"Attachments" in block ? block.Attachments[0]?.url : "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"} className="details-image" alt={block.Name} />
          <div className="block-references">
            <h3>References</h3>
            <ul>
              {Object.keys(block.linked_references).length !== 0 ? (
                block.linked_references[0]?.map((ref, i) => {
                  if (i % 2 == 0) {
                    const references = block.linked_references[0];
                    return (
                      <li>
                        {references[i]}
                        <a href={references[i+1]} target="_blank" rel="noreferrer">
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </a>
                      </li>
                    )
                  }
                })
              ) : <li></li>}
            </ul>
          </div>
          <div className="block-surgeries">
            <h3>Surgeries</h3>
            <ul>
              {Object.keys(block["Name (from surgeries)"] || {}).length !== 0 ? 
              (
                block["Name (from surgeries)"]?.map((surgery, i) => {
                  return (
                    <Link to={`/surgery/${surgery}`} key={`surgery${i}`}>
                      <li>{CapitalizeFirstLetter(surgery)}</li>
                    </Link>
                  )
                })
              ) : <li>No surgeries found</li>}
            </ul>
          </div>
        </>
      )}
      <Navbar />
    </div>
  )
}

export default Block