import React, { useState, useEffect } from 'react';
import algosdk from 'algosdk';

const DashboardPage = ({ userAddress, algodClient }) => {
  const [algoBalance, setAlgoBalance] = useState(0);
  const [loveBalance, setLoveBalance] = useState(0);
  const [reputationScore, setReputationScore] = useState(0);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!userAddress) return;

      try {
        const accountInfo = await algodClient.accountInformation(userAddress).do();
        setAlgoBalance(accountInfo.amount / 1e6); // Convert microAlgos to Algos

        // Find LOVE token balance
        const loveToken = accountInfo['assets'].find(asset => asset['asset-id'] === 987654321);
        if (loveToken) {
          setLoveBalance(loveToken['amount']);
        }

        // Fetch reputation score from smart contract state
        // This requires an Algorand Indexer query or a direct app call
        // const reputation = await getReputationScore(userAddress);
        // setReputationScore(reputation);

      } catch (error) {
        console.error('Failed to fetch account info:', error);
      }
    };

    fetchBalances();
  }, [userAddress, algodClient]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Flirtify Dashboard</h2>
      <div>
        <h3>Your Balances</h3>
        <p>ALGO: {algoBalance} ALGO</p>
        <p>LOVE Tokens: {loveBalance} LOVE</p>
      </div>
      <div>
        <h3>Your Reputation</h3>
        <p>Current Score: {reputationScore}</p>
      </div>
    </div>
  );
};

export default DashboardPage;