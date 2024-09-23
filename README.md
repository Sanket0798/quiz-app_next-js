# Adaptive Monk Test Application

This is a web application that dynamically adjusts the difficulty of questions based on the user's performance and response time. The project is split into two main parts:
- **Frontend (client)**: Built using Next.js and Tailwind CSS.
- **Backend (api)**: Built using Node.js, Express.js, and SQL for data management.

## Features
1. **Adaptive Difficulty**: The question difficulty adjusts based on how quickly and accurately the user answers.
2. **Performance Summary**: Provides a summary at the end of the test with total score, accuracy, average response time, difficulty progression, and recommendations.
3. **Responsive Design**: Optimized for desktop, tablet, and mobile.
4. **User Authentication**: Users can create accounts and track their progress.
5. **Score-Card**: Users can compare their scores and review incorrect answers.

---

## Technology Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js, PostgreSQL
- **Database**: SQL
- **Package Manager**: Yarn (for frontend) and npm (for backend)

---

### Clone the Repository
```bash
git clone https://github.com/your-repo/adaptive-monk-test.git

---

Running the Application:
Frontend (client)
1) Navigate to the client folder: cd client
2) Install dependencies: yarn install
3) Start the development server: yarn run dev
4) The frontend will run on http://localhost:3000.

Backend (api)
1) Navigate to the api folder: cd api
2) Install dependencies: npm install
3) Start the backend server: npm start
4) The backend will run on http://localhost:8800.

