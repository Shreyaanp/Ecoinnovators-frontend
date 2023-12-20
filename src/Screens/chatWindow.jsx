import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdDataset } from "react-icons/md";
import './chatWindow.css';

const backendUrl = 'http://localhost:8000';

function FileSelect({ file, onCancel, onConfirm, onPrivacyChange, isUploading, uploadError }) {
    const [isPrivate, setIsPrivate] = useState(false);

    const handlePrivacyChange = () => {
        setIsPrivate(!isPrivate);
        onPrivacyChange(!isPrivate);
    };

    return (
        <div className="file-selection-container">
        <p className="file-selection-title">Selected File: {file.name}</p>
        <div className="file-selection-status">
          <span>Public</span>
          <label className="file-privacy-toggle">
            <input type="checkbox" checked={isPrivate} onChange={handlePrivacyChange} />
            <span className="file-privacy-toggle-label"></span>
          </label>
        </div>
        {isPrivate && (
          <p className="file-selection-private">Private file: A code will be sent to your email</p>
        )}
        <div className="file-selection-buttons">
          <button onClick={onCancel} className="file-button file-button-cancel">Cancel</button>
          <button onClick={onConfirm} className="file-button file-button-confirm">Confirm</button>
        </div>
      </div>
    );
}
function Modal({ show, onClose, children }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

function FileList() {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`${backendUrl}/files/`);
            setFiles(response.data.files);
        } catch (error) {
            setError('Failed to fetch files.');
        }
    };

    const handleDelete = async (fileName) => {
        try {
            await axios.delete(`${backendUrl}/delete-file/${fileName}`);
            setFiles(files.filter(file => file !== fileName));
        } catch (error) {
            setError('Failed to delete the file.');
        }
    };

    return (
        <div>
            <h3>Available Data Files</h3>
            {error && <p className="error">{error}</p>}
            <ul>
                {files.map(file => (
                    <li key={file}>
                        {file} <button onClick={() => handleDelete(file)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
function TabContainer({ onSeeDataClick }) {
    const [tabs, setTabs] = useState(['Tab 1']);
    const [activeTab, setActiveTab] = useState('Tab 1');

    const addTab = () => {
      const newTabName = `Tab ${tabs.length + 1}`;
      setTabs([...tabs, newTabName]);
      setActiveTab(newTabName);
    };

    const deleteTab = (tabName) => {
      setTabs(tabs.filter(tab => tab !== tabName));
      if (activeTab === tabName) {
        setActiveTab(tabs[0]);
      }
    };

    const onNewButtonClick = () => {
        console.log('New button clicked!');
        // Define the action for the new button here
    };


    return (
        <div className="tab-container">
            <div className="tab-list">
                {tabs.map(tab => (
                    <Tab key={tab} name={tab} onClose={() => deleteTab(tab)} />
                ))}
                <button className="tab-add-button" onClick={addTab}>+</button>
                {/* Using onSeeDataClick prop when "See data" button is clicked */}
                <button className="tab-new-button" onClick={onSeeDataClick}>See data</button>
            </div>
            <div className="tab-content">{activeTab} content here</div>
        </div>
    );
  }

function Tab({ name, onClose }) {
    return (
      <div className="tab">
        {name}
        <button className="tab-close-button" onClick={onClose}>×</button>
      </div>
    );
  }


function ChatWindow() {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);
    const [data, setData] = useState('prod');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePrivate, setIsFilePrivate] = useState(false);
    const [showFiles, setShowFiles] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showFileSelectModal, setShowFileSelectModal] = useState(false);
    const handleSeeDataClick = () => {
        setShowFileSelectModal(true);
        // Optionally, load the data file here if needed
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const onSeeDataClick = () => {
        // You may need to implement additional logic here depending on your requirements
        setShowFileSelectModal(true);
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
            setUserInput('');
        } catch (error) {
            console.error('Error sending user message:', error);
            setError('Failed to send message.');
        }

        setIsLoading(false);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile({
            file: file,
            name: file.name,
            iconUrl: '/path-to-file-icon.png'
        });
    };
    const toggleFileList = () => {
        setShowFiles(!showFiles);
    };
    const handleCancelFile = () => {
        setSelectedFile(null);
    };

    const handleConfirmFile = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile.file);

        try {
            await axios.post(`${backendUrl}/uploadfile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (isFilePrivate) {
                await sendEmail();
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to upload file or send email.');
        }

        setSelectedFile(null);
    };

    const sendEmail = () => {
        const serviceId = 'service_hqj0p4v';
        const templateId = 'template_mkqzflm';
        const userId = '3GYLqmYhByOweZLSo';

        const templateParams = {
            to_email: 'shreyaan.work@gmail.com',
            // Add any other template parameters if needed
        };

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then(response => {
                console.log('Email sent successfully:', response.text);
            }, error => {
                console.error('Failed to send email:', error.text);
            });
    };

    return (
        <div className="chatApp">
            {error && <p className="error">{error}</p>}
            <div className="content">
            <div className="left-panel">
                    {/* The TabContainer takes the full width and height of the left panel */}
                    <TabContainer onSeeDataClick={handleSeeDataClick} />

                    {/* Other elements like view-dataset and fileUpload-window */}
                    {/* Modal that uses the FileSelect */}
            <Modal show={showFileSelectModal} onClose={() => setShowFileSelectModal(false)}>
                <FileSelect
                    file={selectedFile || { name: 'No file selected' }} // Placeholder file object
                    onCancel={() => setShowFileSelectModal(false)}
                    onConfirm={() => setShowFileSelectModal(false)} // Implement the confirm logic
                    onPrivacyChange={(isPrivate) => setIsFilePrivate(isPrivate)}
                />
            </Modal>
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
