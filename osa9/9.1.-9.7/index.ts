import express from "express";
import { calculateBmiForExpress } from "./calculators";
import { calculateExercisesForExpress } from "./calculators";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    res.json({
      weight: req.query.weight,
      height: req.query.height,
      bmi: calculateBmiForExpress(Number(req.query.height), Number(req.query.weight)),
    });
  } catch (e) {
    res.status(400).json({
      error: "malformatted parameters"
    });
  }
});

app.post("/exercises", (req, res) => {
  try {
    res.json(
      calculateExercisesForExpress(req.body.daily_exercises, req.body.target)
    );
  } catch (e) {
    res.status(400).json({
      error: e.message
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});