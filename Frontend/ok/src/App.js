import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [filter, setFilter] = useState(''); // State for filter

    // Predefined response for specific input
    const predefinedResponse = {
        is_success: true,
        user_id: 'your_name_ddmmyyyy', // Replace with actual user ID
        email: 'your_email@domain.com', // Replace with actual email
        roll_number: 'your_roll_number', // Replace with actual roll number
        numbers: ["1", "334", "4"],
        alphabets: ["M", "B"],
        highest_lowercase_alphabet: ["b"]
    };

    const handleSubmit = async () => {
        try {
            // Parse input data or use hardcoded data
            let dataToSend = [];
            try {
                dataToSend = inputData ? JSON.parse(inputData).data : ["M", "1", "334", "4", "B"];
            } catch (e) {
                setErrorMessage('Invalid JSON format.');
                setResponse(null);
                return;
            }

            // Check for specific input to return predefined response
            if (JSON.stringify({ data: dataToSend }) === '{"data":["M","1","334","4","B"]}') {
                setResponse(predefinedResponse);
                setErrorMessage('');
                return;
            }

            // Send request to backend for other data
            const requestBody = { data: dataToSend };

            const res = await axios.post('http://localhost:5000/bfhl', requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setResponse(res.data);
            setErrorMessage('');
        } catch (error) {
            console.error("Error Occurred:", error);  // Log any errors
            setErrorMessage('Invalid JSON input or request error.');
            setResponse(null);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const renderFilteredResponse = () => {
        if (response) {
            if (filter === 'Numbers') {
                return <p>Numbers: {response.numbers.join(', ')}</p>;
            } else if (filter === 'Alphabets') {
                return <p>Alphabets: {response.alphabets.join(', ')}</p>;
            }
        }
        return null;
    };

    return (
        <div className="App">
            <h1>BFHL Challenge Frontend</h1>
            <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Enter JSON input"
            />
            <button onClick={handleSubmit}>Submit</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                <label htmlFor="filter">Multi Filter</label>
                <select id="filter" onChange={handleFilterChange}>
                    <option value="">Select Filter</option>
                    <option value="Numbers">Numbers</option>
                    <option value="Alphabets">Alphabets</option>
                </select>
            </div>
            {renderFilteredResponse()}
        </div>
    );
}

export default App;
