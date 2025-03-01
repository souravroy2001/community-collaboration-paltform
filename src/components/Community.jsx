import React, { useState } from 'react';
import axios from 'axios';

const Community = () => {
  const [community, setCommunity] = useState('');
  const [showData, setShowData] = useState([]);

 
  const handleCreate = async () => {
    try {
      const res = await axios.post(
        'https://masai-hackathon-2025-default-rtdb.firebaseio.com/community.json',
        { name: community } 
      );
      console.log("Community Created:", res.data);
      setCommunity(''); 
    } catch (error) {
      console.error('Error creating community', error);
    }
  };

 
  const handleShow = async () => {
    try {
      const res = await axios.get(
        'https://masai-hackathon-2025-default-rtdb.firebaseio.com/community.json'
      );
      setShowData(res.data ? Object.entries(res.data) : []);
    } catch (error) {
      console.error('Error fetching communities', error);
    }
  };

  return (
    <div style={{marginTop:"85px"}} >
      <input
        type="text"
        placeholder="Create a Community"
        value={community}
        onChange={(e) => setCommunity(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
      <button onClick={handleShow}>Display Communities</button>

      <div>
        <h3>Communities:</h3>
        <ul>
          {showData.map(([id, community]) => (
            <li key={id}>{community.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Community;
