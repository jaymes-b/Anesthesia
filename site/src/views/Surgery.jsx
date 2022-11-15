import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import PageBar from '../components/PageBar';
import Accordion from '../components/Accordion';
import './DetailsPage.css';

const Surgery = () => {
  const { surgeryId } = useParams();
  const [surgery, setSurgery] = useState({});

  const getSurgery = async () => {
    await axios.get(`http://127.0.0.1:5000/api/surgery?surgeryName=${surgeryId}`)
      .then(res => {
        setSurgery(res.data.rows[0] || {});
      })
  }

  useEffect(() => {
    getSurgery();
  }, [surgeryId])
  
  return (
    <div className="details-page">
      <PageBar pageTitle={CapitalizeFirstLetter(surgery?.Name) || ""} />
      {Object.keys(surgery).length === 0 ? "No information found" : (
        <>
          <img src={"Attachments" in surgery ? surgery.Attachments[0]?.url : ""} className="details-image" alt={surgery.Name}/>
          <div className="surgery-blocks">
            <h3>Block selection</h3>
            {surgery.linked_references?.map(block => {
              return (
                <Accordion labelName={CapitalizeFirstLetter(block[0])}>
                  <ul>
                    {block[1] ? (
                      <li>
                        {block[1]}
                        <a href="#" target="_blank" rel="noreferrer">
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </a>
                      </li>
                    ) : <li>N/A</li>}
                    <Link to={`/block/${block[0]}`}>
                      <li>More information</li>
                    </Link>
                  </ul>
                </Accordion>
              )
            })}
          </div>
          <div className="surgery-preferences">
            <h3>Surgeon preferences</h3>
            {surgery["surgeon-pref-data"]?.filter(pref => pref["surgeon-name"] !== "NOTES").map(pref => {
              return (
                <p>
                  <b>{pref["surgeon-name"] + ": "}</b>
                  {pref["pre-approved"] ? "PRE-APPROVED " : null}
                  {pref.timing + " "}
                  {pref["Name (from block)"]}
                </p>
              )
            })}
            {surgery["surgeon-pref-data"]?.filter(pref => pref["surgeon-name"] === "NOTES").map(pref => {
              return (
                <p>
                  <b>{pref["surgeon-name"] + ": "}</b>
                  {pref.Notes}
                </p>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default Surgery