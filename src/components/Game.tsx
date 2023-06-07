import { useState, useEffect } from "react";
import Form from "./Form";
import Question from "./Question";

type qObject = {
  text: string;
};

type QuestionObject = {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: qObject;
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
};

const Game = () => {
  const difficulty: string = "easy";
  const category: string = "science";
  const numberOfQuestions: number = 20;
  const [questions, setQuestions] = useState<Record<string, QuestionObject>>(
    {}
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    fetch(
      `https://the-trivia-api.com/v2/questions?limit=${numberOfQuestions}&categories=${category}&difficulties=${difficulty}`
    )
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  console.log(questions);

  /* handle the click on next question */
  function handleNextQuestion(): void {
    setCurrentQuestion((prev) => prev + 1);
  }

  return (
    <main>
      <Form></Form>
      <Question
        questions={questions}
        currentQuestion={currentQuestion}
        handleNextQuestion={handleNextQuestion}
      ></Question>
    </main>
  );
};

export default Game;
