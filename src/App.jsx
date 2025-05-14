import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MessageStorageABI from './abi/MessageABI.json';
import Login from './Login';
import Message from './Message';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
 const [account, setAccount] = useState(null);
 const [contract, setContract] = useState(null);
 const [provider, setProvider] = useState(null);

 useEffect(() => {
  const initialize = async () => {
   if (window.ethereum) {
    const ethProvider = new ethers.BrowserProvider(window.ethereum);
    setProvider(ethProvider);

    const signer = await ethProvider.getSigner();
    const messageContract = new ethers.Contract(contractAddress, MessageStorageABI, signer);
    setContract(messageContract);

    window.ethereum.on('accountsChanged', (accounts) => {
     setAccount(accounts[0] || null);
    });

    window.ethereum.on('chainChanged', () => {
     window.location.reload();
    });
   } else {
    alert("Please install MetaMask to use this application!");
   }
  };

  initialize();

  return () => {
   if (window.ethereum) {
    window.ethereum.removeAllListeners('accountsChanged');
    window.ethereum.removeAllListeners('chainChanged');
   }
  };
 }, []);

 return (
  <Router>
   <Routes>
    <Route
     path="/"
     element={<Login setAccount={setAccount} />}
    />
    <Route
     path="/message"
     element={
      account ? (
       <Message account={account} contract={contract} />
      ) : (
       <Navigate to="/" replace />
      )
     }
    />
   </Routes>
  </Router>
 );
}

export default App;

