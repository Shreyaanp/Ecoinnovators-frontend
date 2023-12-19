import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdDataset } from "react-icons/md";

import './chatWindow.css';
import FileSelect from '../Components/FileSelect';

// Point this URL to your FastAPI backend
const backendUrl = 'http://localhost:8000';

function ChatWindow() {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);
    const [data, setData] = useState('prod');
    const [selectedFile, setSelectedFile] = useState(null);


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
            const response = await axios.post(`${backendUrl}/talkdata/`, {
                "dataframe_name": data,
                "question": userInput,
            });
            const newBotMessage = { sender: 'bot', text: response.data.response };
            setMessages(messages => [...messages, newBotMessage]);
            setUserInput(''); // Clear input field after sending
        } catch (error) {
            console.error('Error sending user message:', error);
            setError('Failed to send message.');
        }

        setIsLoading(false);
    };

    const handleFileUpload = async (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        setSelectedFile({
            name: selectedFile.name,
            iconUrl: '/path-to-file-icon.png', // Replace with the actual file icon URL
        });
    };

    const handleCancelFile = () => {
        // Clear the selected file
        setSelectedFile(null);
    };
    
    const handleConfirmFile = () => {
        // Handle the confirmation action here, e.g., send the file to the server
        // ...
    
        // Clear the selected file after handling
        setSelectedFile(null);
    };

    const handleFileDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile) {
            // Handle the dropped file
            handleFileUpload({ target: { files: [selectedFile] } });
        }
    };

    const handleFileDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="chatApp">
            {error && <p className="error">{error}</p>}

            <div className="content">
                <div className="left-panel">
                    <div className="view-dataset">
                    <MdDataset className='dataset-icon' />
                    <p>View all datasets</p>
                    </div>
                    
    {!selectedFile ? (
        <div className="fileUpload-window" onDrop={handleFileDrop} onDragOver={handleFileDragOver}>
        <div>
            <label htmlFor="fileInput" className="file-upload-label">
                <AiOutlineFileAdd className='fileupload-icon'/>
            </label>
            <p>add/drag one or more data files here to enable chatbot and visualization</p>
            <input type="file" accept=".csv, .xlsx, .json" onChange={handleFileUpload} style={{ display: 'none' }} id="fileInput" />
        </div>
        </div>
    ) : (
        <FileSelect file={selectedFile} onCancel={handleCancelFile} onConfirm={handleConfirmFile} />
    )}


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


export default ChatWindow;
