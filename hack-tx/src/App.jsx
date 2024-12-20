import { useState, useEffect, useRef } from 'react';
import './App.css';
import Popup from './Popup';
import PopupWin from './PopupWin';
import ReactMarkdown from 'react-markdown';
import angerImage from "./assets/emotions/Anger.png";
import sadnessImage from "./assets/emotions/Sadness.png";
import happinessImage from "./assets/emotions/Happy.png";
import calmImage from "./assets/emotions/calm.png";
import background from './assets/background.png';

const emotionImages = {
  anger: angerImage,
  sadness: sadnessImage,
  happiness: happinessImage,
  calm: calmImage,
};

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [difficulty, setDifficulty] = useState('normal');
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const chatHistoryRef = useRef(null);
  const [sentiment, setSentiment] = useState('');
  const [imageSrc, setImageSrc] = useState(calmImage); // Set initial image to calm
  const [showWinPopup, setShowWinPopup] = useState(false);

  const maxAttempts = {
    easy: 10,
    normal: 7,
    hard: 4
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    document.body.style.background = `url(${background}) center / cover no-repeat`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }, []);

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() && attempts < maxAttempts[difficulty]) {
      const userMessage = { text: input, isUser: true };
      setMessages([...messages, userMessage]);
      setInput('');
      setAttempts(attempts + 1);
      try {
        setLoading(true);
        console.log('Sending message:', input);
        const encodedPrompt = encodeURIComponent(input);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        };
        const res = await fetch(`https://api.talkwith.tech/game-one?input_text=${encodedPrompt}`, requestOptions);
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        let finalAnswer = await res.text(); 
        finalAnswer = finalAnswer.trim().replace(/\n\s*\n/g, '\n\n');
        const sentimentMatch = finalAnswer.match(/Sentiment:\s*(\w+)/);
        if (sentimentMatch) { // Sentiment gets picked up and set here, you can use this to determine the sprite
          setSentiment(sentimentMatch[1]);
          console.log('Extracted Sentiment:', sentimentMatch[1]);
        }

        const aiMessage = { text: `${finalAnswer}`, isUser: false };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error:', error);
        const aiMessage = { text: 'Customer has left the store.', isUser: false };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } finally {
        setLoading(false);
      }
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
  useEffect(() => {
    if (sentiment) {
      setImageSrc(emotionImages[sentiment.toLowerCase()] || calmImage);
      if (sentiment.toLowerCase() === 'happiness') {
        setShowWinPopup(true);
      }
    }
  }, [sentiment]);

  return (
    <div className="app-container">
      <img 
        src={imageSrc}
        alt={`Customer mood: ${sentiment || 'calm'}`} 
        className="full-screen-image"
        onError={(e) => console.error('Image load error:', e)}
      />
      {showPopup && <Popup onStart={handleStart} />}
      {showWinPopup && <PopupWin />}
      <div className="attempts-counter">
        Attempts: {attempts}/{maxAttempts[difficulty]}
      </div>
      <div className="chat-box">
        <div className="chat-history" ref={chatHistoryRef}>
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.isUser ? 'user-message' : 'ai-message'}`}>
              {message.isUser ? 'You: ' : 'Customer:\n'}
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          ))}
        </div>
        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            disabled={attempts >= maxAttempts[difficulty] || loading}
          />
          <button 
            onClick={handleSendMessage} 
            className="send-button"
            disabled={attempts >= maxAttempts[difficulty] || loading}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;