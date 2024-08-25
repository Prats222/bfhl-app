const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

// Schema definition
const DataSchema = new mongoose.Schema({
    numbers: [String],  // Changed to String for consistency
    alphabets: [String],
    highest_lowercase_alphabet: String,
});

const DataModel = mongoose.model('Data', DataSchema);

// POST route for /bfhl
app.post('/bfhl', async (req, res) => {
    try {
        const { data } = req.body;
        console.log('Request Body:', req.body);

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: 'Invalid input data format. Expected a JSON array.'
            });
        }

        const numbers = [];
        const alphabets = [];
        let highestLowercaseAlphabet = null;

        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (/^[A-Za-z]$/.test(item)) {
                alphabets.push(item);
                if (item >= 'a' && item <= 'z' && (highestLowercaseAlphabet === null || item > highestLowercaseAlphabet)) {
                    highestLowercaseAlphabet = item;
                }
            }
        });

        const newData = new DataModel({
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        });

        await newData.save();

        res.json({
            is_success: true,
            user_id: '1', // Replace with actual user ID
            email: 'mprateek058@gmail.com', // Replace with actual email
            roll_number: '21BIT0288', // Replace with actual roll number
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            is_success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
