import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import PageBar from '../components/PageBar';
import Accordion from '../components/Accordion';
import DUMMY_DATA from '../dummyData.json';
import './DetailsPage.css';

const Surgery = () => {
  const { surgeryId } = useParams();
  const [surgery, setSurgery] = useState({});

  useEffect(() => {
    const s = DUMMY_DATA.surgeries.find(surgery => surgery.id === surgeryId);
    setSurgery(s);
  }, [surgeryId])
  
  return (
    <div className="details-page">
      <PageBar pageTitle={CapitalizeFirstLetter(surgery?.surgery) || ""} />
      <img src={surgery.image} className="details-image" alt={surgery.surgery}/>
      <div className="surgery-blocks">
        <h3>Block selection</h3>
        {surgery.blocks?.map(block => {
          const blockInfo = DUMMY_DATA.blocks.find(b => b.id === block);
          return (
            <Accordion labelName={CapitalizeFirstLetter(blockInfo.block)}>
              <ul>
                {blockInfo.references.length === 0 ? (
                  <li>N/A</li>
                ) : blockInfo.references.map(ref => {
                return (
                  <li>
                    {ref.title}
                    <a href={ref.link} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  </li>
                )
                })}
                <Link to={`/block/${blockInfo.id}`}>
                  <li>More information</li>
                </Link>
              </ul>
            </Accordion>
          )
        })}
      </div>
      <div className="surgery-preferences">
        <h3>Surgeon preferences</h3>
        {surgery.surgeonPrefs?.map(surgeon => {
          return (
            <p>
              <b>{surgeon.surgeon + ": "}</b>
              {surgeon.blocks.length === 0 ? "N/A" :
                surgeon.blocks.map(block => {
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
    </div>
  )
}

export default Surgery