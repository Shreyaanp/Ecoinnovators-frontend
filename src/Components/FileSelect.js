import React, { useState } from 'react';
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import axios from 'axios'; // Import axios

import './FileSelect.css';

function FileSelect({ file, onCancel, onConfirm }) {
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateCode, setPrivateCode] = useState('');

    const handleToggle = () => {
        setIsPrivate(!isPrivate);

        if (!isPrivate) {
            // Generate a 6-digit alphanumeric code
            const code = generateRandomCode(6);
            setPrivateCode(code);
        } else {
            // Clear the private code if toggled to public
            setPrivateCode('');
        }
    };

    const [selectedOption, setSelectedOption] = useState('public');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        handleToggle();
    };

    const generateRandomCode = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return code;
    };

    // Function to send an email
    const sendEmail = () => {
        // Replace with your Elastic Email API key
        const apiKey = 'YOUR_API_KEY';

        // Prepare email data
        const emailData = {
            apiKey,
            subject: 'Your Private Code',
            from: 'no-reply@example.com', // Your no-reply email address
            to: 'recipient@example.com', // Recipient's email address (can be dynamic)
            bodyText: `Your private code is: ${privateCode}`, // Include the private code here
        };

        // Send the email using the Elastic Email API
        axios.post('https://api.elasticemail.com/v2/email/send', emailData)
            .then(response => {
                console.log('Email sent successfully:', response.data);
                // Handle success, e.g., show a success message to the user
                onConfirm(); // Call the onConfirm callback after sending the email
            })
            .catch(error => {
                console.error('Error sending email:', error);
                // Handle error, e.g., show an error message to the user
            });
    };

    return (
        <div className="selected-file">
            <AiOutlineFileAdd className='fileupload-icon'/>
            <p>{file.name}</p>
            <div className="toggle-container">
                <label>
                    <input
                        type="radio"
                        name="privacyOption"
                        value="public"
                        checked={selectedOption === 'public'}
                        onChange={handleOptionChange}
                    />
                    Public
                </label>
                <label>
                    <input
                        type="radio"
                        name="privacyOption"
                        value="private"
                        checked={selectedOption === 'private'}
                        onChange={handleOptionChange}
                    />
                    Private
                </label>
            </div>
            {selectedOption === 'private' && (
                <div className="private-code">
                    <p className='private-banner'>
                        Private Code: Will be sent to your email <MdOutlineEmail />
                    </p>
                </div>
            )}
            <div className="filebtn-center">
                <div className="fileBtn-container">
                    <button onClick={onCancel} className='filebtn'>Cancel</button>
                    <button onClick={sendEmail} className='filebtn'>OK</button>
                </div>
            </div>
        </div>
    );
}

export default FileSelect;
