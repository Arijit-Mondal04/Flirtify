import algosdk from 'algosdk';
import { PeraWalletConnect } from '@perawallet/connect';

// Initialize the Pera Wallet SDK
const peraWallet = new PeraWalletConnect();

// Set up Algod client for TestNet
const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', 443);

// NOTE: Replace these with your actual smart contract and ASA IDs
const APP_ID = 123456789;
const LOVE_ASA_ID = 987654321;

// -- Wallet and Profile Functions --

export const connectWallet = async () => {
  try {
    const newAccounts = await peraWallet.connect();
    if (newAccounts.length > 0) {
      return newAccounts[0]; // Pera returns an array of addresses
    }
    return null;
  } catch (error) {
    console.error('Could not connect to Pera Wallet:', error);
    return null;
  }
};

export const createProfile = async (address, profileData) => {
  try {
    const suggestedParams = await algodClient.getTransactionParams().do();
    suggestedParams.fee = 1000;
    suggestedParams.flatFee = true;

    const transactions = [];

    // Staking ALGO (50 ALGO) to the contract's account
    const stakeTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: address,
      to: algosdk.getApplicationAddress(APP_ID),
      amount: .02 * 1e6, // .02 ALGO in microAlgos
      suggestedParams,
      note: new Uint8Array(Buffer.from('profile_stake')),
    });
    transactions.push(stakeTxn);

    // Application call to create the profile
    const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
      from: address,
      appIndex: APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [new Uint8Array(Buffer.from('create_profile'))],
      accounts: [],
      suggestedParams,
    });
    transactions.push(appCallTxn);

    const groupedTxns = algosdk.assignGroupID(transactions);
    const signedTxns = await peraWallet.signTransaction([groupedTxns.map(txn => ({ txn }))]);
    const txId = await algodClient.sendRawTransaction(signedTxns).do();
    
    return txId;
  } catch (error) {
    console.error('Failed to create profile:', error);
    return null;
  }
};

// -- Messaging and Reward Functions --

export const sendMessage = async (sender, recipient, message) => {
  try {
    const suggestedParams = await algodClient.getTransactionParams().do();
    suggestedParams.fee = 1000;
    suggestedParams.flatFee = true;

    const transactions = [];

    // Payment transaction for 0.5 ALGO to recipient
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender,
      to: recipient,
      amount: 0.5 * 1e6,
      suggestedParams,
      note: new Uint8Array(Buffer.from(message)),
    });
    transactions.push(paymentTxn);

    // App call to record the message on-chain
    const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
      from: sender,
      appIndex: APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [new Uint8Array(Buffer.from('send_message'))],
      accounts: [recipient],
      suggestedParams,
    });
    transactions.push(appCallTxn);

    const groupedTxns = algosdk.assignGroupID(transactions);
    const signedTxns = await peraWallet.signTransaction([groupedTxns.map(txn => ({ txn }))]);
    const txId = await algodClient.sendRawTransaction(signedTxns).do();
    
    return txId;
  } catch (error) {
    console.error('Failed to send message:', error);
    return null;
  }
};

export const getAccountInfo = async (address) => {
  try {
    const accountInfo = await algodClient.accountInformation(address).do();
    return accountInfo;
  } catch (error) {
    console.error('Failed to get account info:', error);
    return null;
  }
};