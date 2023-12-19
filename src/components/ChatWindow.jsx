import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatWindow.css';

// Point this URL to your FastAPI backend
const backendUrl = 'http://localhost:8000';

function App() {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleUserInput = async () => {
        if (!userInput) return;
        setIsLoading(true);
        const newUserMessage = { sender: 'user', text: userInput };
        setMessages(messages => [...messages, newUserMessage]);

        try {
            const response = await axios.post(`${backendUrl}/generate-response/`, { prompt: userInput });
            const newBotMessage = { sender: 'bot', text: response.data.response };
            setMessages(messages => [...messages, newBotMessage]);
            setUserInput(''); // Clear input field after sending
        } catch (error) {
            console.error('Error sending user message:', error);
            setError('Failed to send message.');
        }

        setIsLoading(false);
    };

    return (
        <div className="App">
            {error && <p className="error">{error}</p>}

            <div className="content">
                <div className="left-panel">
                    <div className="visualization-window">
                        <h2>Visualization</h2>
                        <p>Visualization goes here...</p>
                    </div>
                </div>

                <div className="right-panel">
                    <div className="chat-window">
                        {messages.map((msg, index) => (
                            <p key={index} className={`${msg.sender === 'user' ? 'user-message' : 'bot-message'} message`}>
                                {msg.text}
                            </p>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your message here..."
                            className="message-input"
                            onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
                        />
                        <button
                            className="action-button"
                            onClick={handleUserInput}
                            disabled={isLoading}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
