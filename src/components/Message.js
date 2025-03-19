import React from 'react';
import './Message.css';

const Message = ({ message }) => {
  const { sender, content, timestamp } = message;
  const isBot = sender === 'bot';
  
  return (
    <div className={`message ${isBot ? 'bot-message' : 'user-message'}`}>
      <div className="message-content">
        {content}
      </div>
      <div className="message-timestamp">
        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default Message;