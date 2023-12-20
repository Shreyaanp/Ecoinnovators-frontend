import React, { useState } from 'react';
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import axios from 'axios'; // Import axios
import emailjs from 'emailjs-com'; // Import emailjs-com

import './FileSelect.css';

function FileSelect({ file, onCancel, onConfirm}) {
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
        // Emailjs service ID, template ID, and user ID
        const serviceId = 'service_hqj0p4v';
        const templateId = 'template_mkqzflm';
        const userId = '3GYLqmYhByOweZLSo';

        // Template parameters
        const templateParams = {
            to_email: 'shreyaan.work@gmail.com', // Recipient email
            private_code: privateCode, // Private code
            // ... any other parameters your template needs
        };

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then(response => {
                console.log('Email sent successfully:', response.text);
                onConfirm(); // Call the onConfirm callback after sending the email
            }, error => {
                console.error('Failed to send email:', error.text);
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
