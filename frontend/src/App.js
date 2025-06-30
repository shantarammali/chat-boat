// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMsg = { sender: 'user', text: input };
    setMessages([...messages, userMsg]);

    const res = await axios.post('http://15.206.35.255:5000/chat', {
      message: input,
    });

    const botMsg = { sender: 'bot', text: res.data.response };
    setMessages(prev => [...prev, botMsg]);
    setInput('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Testing Chatbot new111 🤖</h2>
      <div style={{ height: '300px', border: '1px solid #ccc', overflowY: 'scroll', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message"
        style={{ width: '70%', marginTop: '10px' }}
      />
      <button onClick={sendMessage} style={{ marginLeft: '10px' }}>Send</button>
    </div>
  );
}

export default App;
