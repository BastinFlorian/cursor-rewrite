import React, { useState } from 'react';
import './ChatInterface.css';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      content: 'Hello! I\'m your Cursor Agentic Mode assistant. How can I help you today?',
      timestamp: new Date(),
    },
    {
      id: 2,
      sender: 'bot',
      content: 'I can help you with coding tasks. For example, I can explain code like this:\n\n```javascript\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n```\n\nOr I can help you with **markdown** formatting, *lists*, and more:\n\n- Item 1\n- Item 2\n- Item 3',
      timestamp: new Date(Date.now() - 60000),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

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
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response (this would be replaced with actual agent logic)
    setTimeout(() => {
      setIsTyping(false);
      
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        content: `I received your message: "${content}". This is a placeholder response.`,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 2000);
  };

  const handleClearConversation = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        content: 'Hello! I\'m your Cursor Agentic Mode assistant. How can I help you today?',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="chat-interface">
      <ChatHeader onClearConversation={handleClearConversation} />
      <MessageList messages={messages} />
      {isTyping && <div className="typing-indicator-container"><TypingIndicator /></div>}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;