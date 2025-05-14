import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setAccount }) {
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

 const connectWallet = async () => {
  try {
   setLoading(true); // Start loading spinner or indicator
   // Prompt MetaMask to request an account connection
   const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
   });
   
   if (accounts.length > 0) {
    // Set the selected account
    setAccount(accounts[0]);
    // Navigate to the message page after successful login
    navigate('/message');
   } else {
    alert('No account found.');
   }
  } catch (error) {
   console.error('Error connecting wallet:', error);
   alert('Please install MetaMask or check your wallet connection.');
  } finally {
   setLoading(false); // Stop loading spinner or indicator
  }
 };

 return (
  <div>
   <style>{`
    body {
     font-family: Arial, sans-serif;
     margin: 0;
     padding: 0;
     display: flex;
     justify-content: center;
     align-items: center;
     min-height: 100vh;
     background-color: #f5f5f5;
    }

    .login-container {
     background: white;
     padding: 2rem;
     border-radius: 8px;
     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
     width: 100%;
     max-width: 500px;
    }

    .connect-button {
     background-color: #f6851b;
     color: white;
     border: none;
     padding: 0.75rem 1.5rem;
     border-radius: 4px;
     cursor: pointer;
     font-size: 1rem;
     transition: background-color 0.3s;
    }

    .connect-button:hover {
     background-color: #e2761b;
    }

    .loading-spinner {
     border: 4px solid rgba(255, 255, 255, 0.3);
     border-top: 4px solid #f6851b;
     border-radius: 50%;
     width: 30px;
     height: 30px;
     animation: spin 1s linear infinite;
     margin-top: 1rem;
    }

    @keyframes spin {
     0% { transform: rotate(0deg); }
     100% { transform: rotate(360deg); }
    }
   `}</style>

   <div className="login-container">
    <h1>Login with MetaMask</h1>
    <button onClick={connectWallet} className="connect-button" disabled={loading}>
     {loading ? 'Connecting...' : 'Connect MetaMask'}
    </button>
    {loading && <div className="loading-spinner"></div>}
   </div>
  </div>
 );
}

export default Login;

