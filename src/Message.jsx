import React, { useEffect, useState } from 'react';

function Message({ account, contract }) {
 const [message, setMessage] = useState("");
 const [storedMessage, setStoredMessage] = useState("");

 useEffect(() => {
  if (contract && account) {
   loadStoredMessage();
  }
 }, [contract, account]);

 const loadStoredMessage = async () => {
  try {
   const msg = await contract.userMessages(account);
   setStoredMessage(msg);
  } catch (err) {
   console.error("Error loading stored message:", err);
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!contract || !account) return;

  try {
   const tx = await contract.setMessage(message);
   await tx.wait();
   setStoredMessage(message);
   setMessage("");
  } catch (error) {
   console.error("Error setting message:", error);
  }
 };

 return (
  <>
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

    .app-container {
     background: white;
     padding: 2rem;
     border-radius: 8px;
     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
     width: 100%;
     max-width: 500px;
    }

    .header {
     margin-bottom: 1.5rem;
    }

    .message-container {
     display: flex;
     flex-direction: column;
     gap: 1rem;
    }

    .message-display {
     padding: 1rem;
     border: 1px solid #ddd;
     border-radius: 4px;
     min-height: 50px;
     background-color: #f9f9f9;
    }

    .message-form {
     display: flex;
     gap: 0.5rem;
    }

    .message-input {
     flex: 1;
     padding: 0.5rem;
     border: 1px solid #ddd;
     border-radius: 4px;
    }

    .submit-button {
     background-color: #4CAF50;
     color: white;
     border: none;
     padding: 0.5rem 1rem;
     border-radius: 4px;
     cursor: pointer;
    }

    .submit-button:hover {
     background-color: #45a049;
    }
   `}</style>

    <div className="message-container">
     <h2>Your Message:</h2>
     <div className="message-display">
      {storedMessage || "No message yet"}
     </div>

     <form onSubmit={handleSubmit} className="message-form">
      <input
       type="text"
       value={message}
       onChange={(e) => setMessage(e.target.value)}
       placeholder="Enter your message"
       className="message-input"
      />
      <button type="submit" className="submit-button">
       Enter
      </button>
     </form>
    </div>
  </>
 );
}

export default Message;

