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
        console.log(res)
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
            {surgery["Name (from block)"]?.map(block => {
              // const blockInfo = DUMMY_DATA.blocks.find(b => b.id === block);
              return (
                <Accordion labelName={CapitalizeFirstLetter(block)}>
                  <ul>
                    {block.references?.length === 0 ? (
                      <li>N/A</li>
                    ) : block.references?.map(ref => {
                    return (
                      <li>
                        {ref.title}
                        <a href={ref.link} target="_blank" rel="noreferrer">
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </a>
                      </li>
                    )
                    })}
                    <Link to={`/block/${block}`}>
                      <li>More information</li>
                    </Link>
                  </ul>
                </Accordion>
              )
            })}
          </div>
          <div className="surgery-preferences">
            <h3>Surgeon preferences</h3>
            {surgery["surgeon-name (from surgeon-preference)"]?.map(surgeon => {
              return (
                <p>
                  <b>{surgeon + ": "}</b>
                  {surgeon.blocks?.length === 0 ? "N/A" :
                    surgeon.blocks?.map(block => {
                      return (
                        <>
                          {block.preApproved ? "PRE-APPROVED " : null}
                          {block.preOrPost.map(p => p + " ")}
                          {block.block.toLowerCase()}
                        </>
                      )
                    })
                  }
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