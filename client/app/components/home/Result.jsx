import React from "react";

const Result = ({ score, totalQuestions, difficultyLevel }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
        <p className="text-lg mb-4">
          Final Score: {score} / {totalQuestions}
        </p>
        <p className="text-lg mb-4">
          Final Difficulty Level: {difficultyLevel}
        </p>
        <button
          className="px-6 py-3 bg-green-700 text-white rounded-full font-semibold"
          onClick={() => window.location.reload()} // Reloads the quiz
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
