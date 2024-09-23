import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "quiz-app",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the SQL database!");
});

app.get("/questions", (req, res) => {
  const query =
    "SELECT qs.id as questionId, qs.question, op.id as optionId, op.option_text, op.is_correct as correctOption FROM `quiz-app`.questionset qs inner join `quiz-app`.options op on qs.id=op.question_id;";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from the database:", err);
      return res.status(500).json({ error: "Database error" });
    }
    const result = [];

    results.forEach((item) => {
      const { questionId, question, optionId, option_text, correctOption } =
        item;

      let questionItem = result.find((q) => q.questionId === questionId);

      if (!questionItem) {
        questionItem = {
          questionId,
          question,
          options: [],
        };
        result.push(questionItem);
      }

      questionItem.options.push({
        optionId,
        option_text,
        correctOption: correctOption === "1",
      });
    });

    console.log(JSON.stringify(result, null, 2));
    res.json(result);
  });
});

app.get("/", (req, res) => {
  res.json("This is the backend!");
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
