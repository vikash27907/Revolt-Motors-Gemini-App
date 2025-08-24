Real-Time Conversational AI Voice Assistant
This project is a real-time, conversational voice interface that replicates the functionality of a customer service chatbot, like the one used by Revolt Motors. It leverages the Gemini API for natural language understanding and generation, and uses a secure server-to-server architecture to protect API keys. The interface supports continuous, hands-free operation and allows the user to interrupt the AI for a fluid, natural conversation.

Features
Real-Time Voice Conversation: Engage in natural, spoken conversations with the AI assistant.

Hands-Free Mode: Activate a continuous listening mode to talk to the assistant without needing to press a button for every command.

Interruption Handling: The user can interrupt the AI while it is speaking, and the assistant will immediately stop, listen, and respond to the new input.

Secure Server-to-Server Architecture: All API calls to the Gemini API are handled by a Node.js backend, ensuring that the API key is never exposed on the client-side.

Visual Feedback: The UI provides real-time feedback, showing when the assistant is listening, thinking, or speaking.

Tech Stack
Frontend:

HTML5

Tailwind CSS

JavaScript (ES6+)

Web Speech API (SpeechRecognition & SpeechSynthesis)

Backend:

Node.js

Express.js

node-fetch for making API requests

dotenv for managing environment variables

AI Service:

Google Gemini API

Setup and Installation
Follow these steps to get the project running on your local machine.

Prerequisites
Node.js (version 14.x or higher)

npm (comes with Node.js)

A valid Google Gemini API key.

1. Clone the Repository & Set Up Project Structure
First, set up your project folder structure as follows:

gemini-voice-app/
├── public/
│   └── index.html
├── .env
├── package.json
└── server.js

Place the frontend code into public/index.html.

Place the backend code into server.js.

2. Install Dependencies
Navigate to the root of your project folder in your terminal and run the following command to install the necessary Node.js packages:

npm install express node-fetch dotenv

3. Configure Environment Variables
Create a file named .env in the root of your project folder. Add your Gemini API key to this file:

GEMINI_API_KEY=YOUR_API_KEY_HERE

Replace YOUR_API_KEY_HERE with your actual API key.

Running the Application
Start the Server:
Open your terminal, navigate to the project's root directory, and run the following command:

node server.js

Open the Application:
Once the server is running, you will see a confirmation message in the terminal:
Server is running on http://localhost:3000

Open your web browser and navigate to http://localhost:3000.

You can now start interacting with your voice assistant!
