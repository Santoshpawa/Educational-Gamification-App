🎮 Educational Gamification Platform   Live Link: https://educational-gamification-7df52f.netlify.app/

A full-stack web application designed to enhance learning and problem-solving through gamified challenges and structured questions. The platform features user authentication, protected routes for problem-solving, and a clear distinction between available and restricted content.

🚀 Key Features

User Authentication: Secure user signup and login handled via Express and MongoDB (Redux state management on the frontend).

Problem Listing: Displays a list of available coding or academic questions.

Protected Access: Problem links are only active and clickable if the user is currently logged in.

Visual Feedback: Clear visual indication (disabled styling and tooltip message) for users who need to log in to access content.

RESTful API: Dedicated Express API for fetching question data.

⚙️ Technology Stack

This project is built using a modern MERN-like stack, combining speed, flexibility, and robust data management.

Frontend

Framework: React (Vite)

Styling: Tailwind CSS (for rapid, responsive UI development)

State Management: Redux Toolkit

Routing: React Router DOM

Backend

Runtime: Node.js

Framework: Express.js

Database: MongoDB

ODM: Mongoose

💻 Local Development Setup

Follow these steps to get the application running on your local machine.

1. Prerequisites

Node.js (v18+)

MongoDB (local instance or MongoDB Atlas account)

2. Backend Setup (API)

Clone the repository:

git clone [YOUR_REPO_URL]
cd backend


Install dependencies:

npm install


Configure Environment Variables:
Create a file named .env in the backend root directory and add your connection string:

MONGO_URI="mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/<DATABASE_NAME>?retryWrites=true&w=majority"
PORT=3000


Start the Express Server:

npm start
# Server runs on http://localhost:3000


3. Frontend Setup (React App)

Navigate back to the project root and then into the frontend directory:

cd ../frontend


Install dependencies:

npm install


Configure API URL:
Create a file named .env.development in the frontend root directory and set the API base URL:

VITE_API_URL=http://localhost:3000


Start the React Development Server:

npm run dev
# App runs on http://localhost:5173 (or similar)


The frontend will now connect to the backend running on port 3000.

☁️ Deployment Architecture

The application is designed for a decoupled, microservice-like deployment structure, allowing for easy scaling of the frontend and backend independently.

Component

Deployment Host (Recommended)

Purpose

Frontend (Vite/React)

Vercel or Netlify

Static hosting for maximum speed and global CDN delivery.

Backend (Express/Node.js)

Render or Railway

Dedicated process hosting for persistent, long-running Express server.

Database (MongoDB)

MongoDB Atlas

Free tier cloud-hosted, persistent data store.

Production Configuration

When deploying the frontend, ensure the VITE_API_URL environment variable in your production build settings is set to the public domain name of your deployed Express backend (e.g., https://your-api-name.onrender.com).

CORS Note: Ensure your Express backend has CORS configured to accept requests from your deployed frontend domain (e.g., https://your-frontend-name.vercel.app).
