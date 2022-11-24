import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { CapitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import PageBar from '../components/PageBar';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import './DetailsPage.css';

const Surgeon = () => {
  const { surgeonId } = useParams();
  const [blockList, setBlockList] = useState([]);
  const [surgeryList, setSurgeryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSurgeon = async () => {
    setLoading(true);
    await axios.get(`http://127.0.0.1:5000/api/search/surgeon?surgeonName=${surgeonId}`)
      .then(res => {
        setBlockList(res.data.block_names.block_names);
        setSurgeryList(res.data.surgery_names.surgery_names);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getSurgeon();
  }, [surgeonId])
  

  return (
    <div className="pagebar-page">
      <PageBar pageTitle={surgeonId || ""} />
      {loading ? <Spinner /> : (
        <div className="surgeon-page">
          <h3>Blocks</h3>
          <ul>
            {!loading && blockList.length === 0 ? "No information found" : blockList.map((block, i) => {
              return (
                <Link to={`/block/${block}`} key={`block${i}`}>
                  <li>{CapitalizeFirstLetter(block)}</li>
                </Link>
              )
            })}
          </ul>
          <h3>Surgeries</h3>
          <ul>
            {!loading && surgeryList.length === 0 ? "No information found" : surgeryList.map((surgery, i) => {
              return (
                <Link to={`/surgery/${surgery}`} key={`surgery${i}`}>
                  <li>{CapitalizeFirstLetter(surgery)}</li>
                </Link>
              )
            })}
          </ul>
        </div>
      )}
      <Navbar />
    </div>
  )
}

export default Surgeon