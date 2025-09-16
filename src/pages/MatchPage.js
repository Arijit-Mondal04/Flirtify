import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';

// Dummy data for the hackathon demo
const dummyMatches = [
  { id: 1, name: 'Alice', bio: 'Loves Web3 and long walks on the blockchain.', address: 'ALICE_ADDRESS' },
  { id: 2, name: 'Bob', bio: 'Algorand enthusiast and a great conversationalist.', address: 'BOB_ADDRESS' },
];

const MatchPage = ({ userAddress, onChatSelected }) => {
  const [matches, setMatches] = useState(dummyMatches);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Find Your Match</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {matches.map(match => (
          <ProfileCard 
            key={match.id} 
            profile={match} 
            onMessage={() => onChatSelected(match.address)}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchPage;