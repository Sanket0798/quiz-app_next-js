import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Create a connection to the SQL database
const db = mysql.createConnection({
  host: "localhost", // Update with your SQL host
  user: "root", // Update with your SQL user
  password: "password", // Update with your SQL password
  database: "quiz-app", // Update with your SQL database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the SQL database!");
});

// API route to fetch questions from the SQL table
app.get("/questions", (req, res) => {
  const query =
    "SELECT qs.id as questionId, qs.question, op.id as optionId, op.option_text, op.is_correct as correctOption FROM `quiz-app`.questionset qs inner join `quiz-app`.options op on qs.id=op.question_id;"; // Replace 'questions' with your table name
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from the database:", err);
      return res.status(500).json({ error: "Database error" });
    }
    const result = [];

    console.log(results);

    results.forEach((item) => {
      const {questionId, question, optionId, option_text, correctOption} = item;

      // Check if the questionId already exists in the result array
      let questionItem = result.find((q) => q.questionId === questionId);

      if (!questionItem) {
        // If question doesn't exist, create a new question object
        questionItem = {
          questionId,
          question,
          options: [],
        };
        result.push(questionItem);
      }

      // Add the option to the corresponding question
      questionItem.options.push({
        optionId,
        option_text,
        correctOption: correctOption === "1",
      });
    });

    console.log(JSON.stringify(result, null, 2));
    res.json(result); // Send fetched questions as JSON response
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json("This is the backend!");
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
