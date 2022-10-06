import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageBar from '../components/PageBar';
import Accordion from '../components/Accordion';
import DUMMY_DATA from '../dummyData.json';
import './Surgery.css';

const Surgery = () => {
  const { surgeryId } = useParams();
  const [surgery, setSurgery] = useState({});

  useEffect(() => {
    const surgery = DUMMY_DATA.surgeries.find(surgery => surgery.id === surgeryId);
    setSurgery(surgery);
  }, [surgeryId])
  
  return (
    <div>
      <PageBar pageTitle={surgery?.surgery || ""} />
      <img src={surgery.image} className="surgery-image" alt={surgery.surgery}/>
      <div className="surgery-information">
        <h3>Block selection</h3>
        {surgery.blocks?.map(block => {
          return (
            <Accordion labelName={block.block}>
              <ul>
                {block.links.length === 0 ? (
                  <li>N/A</li>
                ) : block.links.map(link => {
                return (
                  <li>
                    {link.title}
                    <a href={link.link} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  </li>
                )
                })}
              </ul>
            </Accordion>
          )
        })}
        <h3>Surgeon preferences</h3>
        {surgery.surgeonPrefs?.map(surgeon => {
          return (
            <Accordion labelName={surgeon.surgeon}>
              <ul>
                {surgeon.blocks.length === 0 ? (
                  <li>N/A</li>
                ) : surgeon.blocks.map(block => {
                return (
                  <li>
                    {block.preApproved ? "PRE-APPROVED" : null}
                    {" "}
                    {block.preOrPost.map(p => p)}
                    {" "}
                    {block.block.toLowerCase()}
                  </li>
                )
                })}
              </ul>
            </Accordion>
          )
        })}
      </div>
    </div>
  )
}

export default Surgery