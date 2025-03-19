import React, { useState } from 'react';
import './ChatInterface.css';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      content: 'Hello! I\'m your Cursor Agentic Mode assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (content) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Simulate bot response (this would be replaced with actual agent logic)
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        content: `I received your message: "${content}". This is a placeholder response.`,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <div className="chat-interface">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;