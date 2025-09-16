import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import ProfileCreationPage from './pages/ProfileCreationPage';
import MatchPage from './pages/MatchPage';
import ChatPage from './pages/ChatPage';
import { connectWallet } from './services/algorand';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userAddress, setUserAddress] = useState(null);

  const handleWalletConnect = async () => {
    const address = await connectWallet();
    if (address) {
      setUserAddress(address);
      // For the hackathon, we'll assume a new user and go to profile creation.
      // In a real app, you'd check if a profile already exists.
      setCurrentPage('create-profile');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onConnect={handleWalletConnect} />;
      case 'create-profile':
        return <ProfileCreationPage userAddress={userAddress} onProfileCreated={() => setCurrentPage('match')} />;
      case 'match':
        return <MatchPage userAddress={userAddress} onChatSelected={() => setCurrentPage('chat')} />;
      case 'chat':
        return <ChatPage userAddress={userAddress} />;
      default:
        return <div>404 Page Not Found</div>;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
};

export default App;