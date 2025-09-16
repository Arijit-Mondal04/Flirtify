import React from 'react';
import { sendMessage } from '../services/algorand';

const ProfileCard = ({ profile, onMessage }) => {
  const handleMessageClick = async () => {
    const success = await sendMessage('YOUR_WALLET_ADDRESS', profile.address, 'Hello!');
    if (success) {
      alert('Message sent successfully!');
      onMessage();
    } else {
      alert('Failed to send message.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '250px' }}>
      <h3>{profile.name}</h3>
      <p>{profile.bio}</p>
      <button onClick={handleMessageClick}>
        Message ({profile.name}) - 0.5 ALGO
      </button>
    </div>
  );
};

export default ProfileCard;