import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import PageBar from '../components/PageBar';
import Accordion from '../components/Accordion';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import './DetailsPage.css';

const Surgery = () => {
  const { surgeryId } = useParams();
  const [surgery, setSurgery] = useState({});
  const [loading, setLoading] = useState(true);

  const getSurgery = async () => {
    setLoading(true);
    await axios.get(`http://127.0.0.1:5000/api/surgery?surgeryName=${surgeryId}`)
      .then(res => {
        setSurgery(res.data.rows[0] || {});
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getSurgery();
  }, [surgeryId])
  
  return (
    <div className="details-page pagebar-page">
      <PageBar pageTitle={CapitalizeFirstLetter(surgery?.Name) || ""} />
      {loading ? <Spinner /> : Object.keys(surgery).length === 0 ? "No information found" : (
        <>
          <img src={"Attachments" in surgery ? surgery.Attachments[0]?.url : "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"} className="details-image" alt={surgery.Name}/>
          <div className="surgery-blocks">
            <h3>Block selection</h3>
            {Object.keys(surgery.linked_references).length !== 0 ? 
              (
                surgery.linked_references[0]?.map((ref, i) => {
                  if (i % 3 === 0) {
                    const references = surgery.linked_references[0];
                    return (
                      <Accordion labelName={CapitalizeFirstLetter(references[i])} key={`block${i}`}>
                        <ul>
                          {references[i+1] ? (
                            <li>
                              {references[i+1]}
                              <a href={references[i+2]} target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                              </a>
                            </li>
                          ) : <li>No references found</li>}
                          <Link to={`/block/${ref}`}>
                            <li>More information</li>
                          </Link>
                        </ul>
                      </Accordion>
                    )
                  }
                })
              ) : surgery["Name (from block)"] ?
              (
                surgery["Name (from block)"]?.map((block, i) => {
                  return (
                    <Accordion labelName={CapitalizeFirstLetter(block)} key={`block${i}`}>
                      <ul>
                        <li>No references found</li>
                        <Link to={`/block/${block}`}>
                          <li>More information</li>
                        </Link>
                      </ul>
                    </Accordion>
                  )
                })
              ) : "No blocks found"
              }
          </div>
          <div className="surgery-preferences">
            <h3>Surgeon preferences</h3>
            {Object.keys(surgery["surgeon-pref-data"] || {}).length !== 0 ? 
              (
                surgery["surgeon-pref-data"]?.filter(pref => pref["surgeon-name"] !== "NOTES").map((pref, i) => {
                  return (
                    <p key={`preference${i}`}>
                      <b>{pref["surgeon-name"] + ": "}</b>
                      {pref["pre-approved"] ? "PRE-APPROVED " : null}
                      {pref.timing ? pref.timing + " " : null}
                      {pref["Name (from block)"] ? pref["Name (from block)"] : null}
                      {pref.Notes ? ` (${pref.Notes})` : null}
                    </p>
                    )
                  }
                )
              ) : <p>No surgeon preferences found</p>}
            {surgery["surgeon-pref-data"]?.filter(pref => pref["surgeon-name"] === "NOTES").map((pref, i) => {
              return (
                <p key={`notes${i}`}>
                  <b>{pref["surgeon-name"] + ": "}</b>
                  {pref.Notes}
                </p>
              )
            })}
          </div>
        </>
      )}
      <Navbar />
    </div>
  )
}

export default Surgery