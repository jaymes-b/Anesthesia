import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import PageBar from '../components/PageBar';
import DUMMY_DATA from '../dummyData.json';
import './DetailsPage.css';

const Block = () => {
  const { blockId } = useParams();
  const[block, setBlock] = useState({});

  useEffect(() => {
    const b = DUMMY_DATA.blocks.find(block => block.id === blockId);
    setBlock(b);
  }, [blockId])

  return (
    <div className="details-page">
      <PageBar pageTitle={CapitalizeFirstLetter(block?.block) || ""}/>
      <img src={block.image} className="details-image" alt={block.block} />
      <div className="block-references">
        <h3>References</h3>
        <ul>
          {block.references?.map((ref, i) => {
            return (
              <li key={`reference${i}`}>
                {ref.title}
                <a href={ref.link} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="block-surgeries">
        <h3>Surgeries</h3>
        <ul>
          {
            block.surgeries?.map((surgery, i) => {
              const surgeryInfo = DUMMY_DATA.surgeries.find(s => s.id === surgery);
              if (surgeryInfo !== undefined) {
                return (
                  <Link to={`/surgery/${surgery}`} key={`surgery${i}`}>
                    <li>{CapitalizeFirstLetter(surgeryInfo.surgery)}</li>
                  </Link>
                )
              }
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Block