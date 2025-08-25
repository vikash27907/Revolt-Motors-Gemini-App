
// Import necessary packages
const express = require('express');
// FIX: Dynamically import node-fetch, which is an ES Module
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');
require('dotenv').config(); // To manage environment variables

// --- Server Setup ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
// Parse JSON bodies from incoming requests
app.use(express.json());
// Serve the static HTML file from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- API Route ---
// This is the endpoint your frontend will call.
app.post('/api/get-gemini-response', async (req, res) => {
    // 1. Get the chat history from the frontend's request body
    const { chatHistory } = req.body;

    // 2. Validate the input
    if (!chatHistory) {
        return res.status(400).json({ error: 'chatHistory is required' });
    }

    // 3. Securely get the API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('GEMINI_API_KEY is not set in the environment variables.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // 4. Construct the full payload on the server
    const payload = {
        contents: chatHistory,
        systemInstruction: {
            role: "system",
            parts: [{
                text: "You are a friendly and knowledgeable virtual assistant for Revolt Motors, a company that makes stylish, high-performance electric motorcycles. Your goal is to answer customer questions accurately and encourage them to book a test ride. Be conversational and helpful. Do not mention that you are an AI model. Key selling points are: AI-enabled features, zero emissions, low running costs, and swappable batteries. The main bike models are the RV400 and RV300."
            }]
        },
        generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 256,
        },
    };

    // 5. Call the Gemini API from the secure backend
    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error('Gemini API Error:', errorData);
            throw new Error(errorData.error.message || 'Failed to fetch from Gemini API');
        }

        const data = await apiResponse.json();
        
        // 6. Send the Gemini response back to the frontend
        res.json(data);

    } catch (error) {
        console.error('Error in /api/get-gemini-response:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

