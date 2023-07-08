import { useState } from "react";
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
  const numberOfQuestions: number = 10;
  const [questions, setQuestions] = useState<Record<string, QuestionObject>>(
    {}
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  /* handle the click on next question */
  function handleNextQuestion(): void {
    setCurrentQuestion((prev) => prev + 1);
  }

  /* handle the click on search questions button */
  function handleSearch(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.currentTarget;
    const categoryElement = form.querySelector(
      'select[name="category"]'
    ) as HTMLSelectElement;
    const difficultyElement = form.querySelector(
      'select[name="difficulty"]'
    ) as HTMLSelectElement;
    const category: string = categoryElement.value;
    const difficulty: string = difficultyElement.value;
    setCurrentQuestion(0);
    setCorrectCount(0);
    fetch(
      `https://the-trivia-api.com/v2/questions?limit=${numberOfQuestions}&categories=${category}&difficulties=${difficulty}`
    )
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }

  console.log(questions);

  return (
    <main>
      <Form handleSearch={handleSearch}></Form>
      <Question
        questions={questions}
        currentQuestion={currentQuestion}
        handleNextQuestion={handleNextQuestion}
        correctCount={correctCount}
        setCorrectCount={setCorrectCount}
      ></Question>
    </main>
  );
};

export default Game;
