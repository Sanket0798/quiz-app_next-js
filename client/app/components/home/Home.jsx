"use client";
import { useState, useEffect } from "react";
import ResultPage from "./Result";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
const difficultyLevels = [
  "Easy (LEVEL 1)",
  "Medium (LEVEL 2)",
  "Intermediate (LEVEL 3)",
  "Hard (LEVEL 4)",
  "Very Hard (LEVEL 5)",
];

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const totalQuestions = 7;
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  const handleLogin = () => {
    if (!isSignedIn) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8800/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [questions]);

  const formatTime = (time) => {
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes} : ${seconds}`;
  };

  const adjustDifficultyLevel = (elapsedTime) => {
    if (elapsedTime > 30 && difficultyLevel < difficultyLevels.length - 2) {
      setDifficultyLevel((prev) => prev + 2);
    } else if (
      elapsedTime > 15 &&
      difficultyLevel < difficultyLevels.length - 1
    ) {
      setDifficultyLevel((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    setIsSubmitted(true);
    adjustDifficultyLevel(time);

    if (selectedOption === questions[currentQuestionIndex]?.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < totalQuestions) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null);
        setIsSubmitted(false);
        setTime(0);
      }, 1000);
    } else {
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    return (
      <ResultPage
        score={score}
        totalQuestions={totalQuestions}
        totalTime={formatTime(time)}
        difficultyLevel={difficultyLevels[difficultyLevel]}
      />
    );
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const { question, options } = questions[currentQuestionIndex] || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4 sm:p-8 flex items-center justify-center relative">
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">
            Only Education
          </h1>
          {!isSignedIn ? (
            <SignInButton mode="redirect">
              <button className="px-3 py-2 sm:px-6 sm:py-2 bg-[#FF6300] text-white hover:bg-transparent hover:text-black hover:border-black hover:border rounded-full font-semibold">
                Login
              </button>
            </SignInButton>
          ) : (
            <div className="flex items-center">
              <p className="text-base sm:text-lg font-semibold mr-4">
                Welcome, {user.firstName || user.fullName || "User"}!
              </p>
              <SignOutButton>
                <button className="px-3 py-2 sm:px-6 sm:py-2 bg-red-600 text-white hover:bg-transparent hover:text-black hover:border-black hover:border rounded-full font-semibold">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-base sm:text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="text-[14px] md:text-[16px]">
              Time Starts: {formatTime(time)}
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null || isSubmitted}
            className={`px-3 py-2 sm:px-6 sm:py-2 bg-green-700 text-white rounded-full font-semibold ${
              selectedOption === null || isSubmitted
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>

        <div className="mb-4 w-full sm:w-full md:w-full lg:w-full">
          <p className="text-lg font-semibold">
            Question {currentQuestion} of {totalQuestions}
          </p>
          <p className="text-lg sm:text-xl font-bold mb-6">{question}</p>
          <div className="mb-2">
            <p className="text-sm sm:text-md font-semibold">
              Difficulty: {difficultyLevels[difficultyLevel]}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-full lg:w-full">
            {options &&
              options.map((option, idx) => (
                <button
                  key={idx}
                  className={`border border-gray-300 p-2 sm:p-4 rounded-lg text-md sm:text-lg font-semibold hover:bg-gray-100 ${
                    selectedOption === option
                      ? "bg-blue-100 border-blue-400"
                      : ""
                  }`}
                  onClick={() => setSelectedOption(option_text)}
                >
                  {option.option_text}
                </button>
              ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            className={`px-3 py-2 border border-gray-400 rounded-lg ${
              currentQuestion === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentQuestion === 1}
            onClick={() => {
              setCurrentQuestion((prev) => Math.max(prev - 1, 1));
              setCurrentQuestionIndex((prevIndex) =>
                Math.max(prevIndex - 1, 0)
              );
              setSelectedOption(null);
              setTime(0);
            }}
          >
            Prev
          </button>

          <div className="hidden md:flex space-x-2 w-[136px] md:w-[307px] h-[42px]">
            {Array.from({ length: totalQuestions }, (_, idx) => (
              <button
                key={idx + 1}
                className={`px-3 py-2 md:w-[37px] md:h-[42px] border border-gray-400 rounded-lg ${
                  currentQuestion === idx + 1
                    ? "bg-green-700 text-white"
                    : "bg-white"
                }`}
                onClick={() => {
                  setCurrentQuestion(idx + 1);
                  setCurrentQuestionIndex(idx);
                  setSelectedOption(null);
                  setTime(0);
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            className={`px-3 py-2 border border-gray-400 rounded-lg ${
              currentQuestion === totalQuestions
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentQuestion === totalQuestions}
            onClick={() => {
              setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions));
              setCurrentQuestionIndex((prevIndex) =>
                Math.min(prevIndex + 1, totalQuestions - 1)
              );
              setSelectedOption(null);
              setTime(0);
            }}
          >
            Next
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-[33px] text-xs sm:text-sm text-black">
        Made with &#10084; by Sanket Rathod
      </div>
    </div>
  );
};

export default Home;
