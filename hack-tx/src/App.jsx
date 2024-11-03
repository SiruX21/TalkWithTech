import { useState, useEffect, useRef } from 'react';
import './App.css';
import Popup from './Popup';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [difficulty, setDifficulty] = useState('normal');
  const [attempts, setAttempts] = useState(0);
  const chatHistoryRef = useRef(null);

  const maxAttempts = {
    easy: 10,
    normal: 7,
    hard: 4
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (input.trim() && attempts < maxAttempts[difficulty]) {
      const userMessage = { text: input, isUser: true };
      setMessages([...messages, userMessage]);
      setInput('');
      setAttempts(attempts + 1);

      setTimeout(() => {
        const aiMessage = { text: `You said "${input}"`, isUser: false };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }, 1000); // Delay for 1 second to simulate thinking time
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStart = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setShowPopup(false);
  };

  return (
    <div className="app-container">
      {showPopup && <Popup onStart={handleStart} />}
      <div className="attempts-counter">
        Attempts: {attempts}/{maxAttempts[difficulty]}
      </div>
      <div className="chat-box">
        <div className="chat-history" ref={chatHistoryRef}>
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.isUser ? 'user-message' : 'ai-message'}`}>
              {message.isUser ? 'You: ' : 'Teacher: '}{message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            disabled={attempts >= maxAttempts[difficulty]}
          />
          <button 
            onClick={handleSendMessage} 
            className="send-button"
            disabled={attempts >= maxAttempts[difficulty]}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;