"use client"
import React, { useState } from 'react'
import { useSocket } from '../../providers/SocketProvider'
interface messageInterface {
    id: number;
    text: string;
}
const page = () => {
    const [message, setMessage] = useState('');
    const { sendMessage, messages } = useSocket();
  
  // Function to handle sending a message
  const sendHandle = () => {
    if (message.trim()) {
      // In a real application, you'd send the message to the server here
      // and fetch the updated messages from the server
     
      sendMessage(message); // Send the message to the server
      setMessage(''); // Clear the input
    }
  };

   
  return (
    <div className="max-w-md mx-auto p-4">
    <div className="space-y-4">
      {/* Chat Messages List */}
      <ul className="list-none space-y-2">
        { messages.length>0 && messages.map((msg) => (
          <li key={msg} className="bg-gray-200 rounded-lg p-2">
            {msg}
          </li>
        ))}
      </ul>

      {/* Chat Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input input-bordered w-full"
        />
        <button
          onClick={sendHandle}
          className="btn btn-primary"
        >
          Send
        </button>
      </div>
    </div>
  </div>
  )
}

export default page
