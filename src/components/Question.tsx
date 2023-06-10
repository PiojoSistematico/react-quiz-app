import { useState } from "react";
import shuffleArray from "../helpers/shuffleArrayWithIndex";
import shuffleArrayWithIndex from "../helpers/shuffleArrayWithIndex";

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

type QuestionProps = {
  questions: Record<string, QuestionObject>;
  currentQuestion: number;
  handleNextQuestion: () => void;
};

const Question: React.FunctionComponent<QuestionProps> = ({
  questions,
  currentQuestion,
  handleNextQuestion,
}) => {
  const [answerSelected, setAnswerSelected] = useState(false);

  function handleSelection(index: number): void {
    console.log(correctIndex == index ? "Correct answer" : "Wrong answer");
  }

  let shuffledArray: string[] = [];
  let correctIndex: number = -1;

  if (Object.keys(questions).length !== 0) {
    const currentQuestionData = questions[currentQuestion];
    if (currentQuestionData) {
      const answerArray: string[] = [
        currentQuestionData.correctAnswer,
        ...currentQuestionData.incorrectAnswers,
      ];
      shuffledArray = shuffleArrayWithIndex(answerArray);
      correctIndex = shuffledArray.indexOf(currentQuestionData.correctAnswer);
      console.log(correctIndex);
    }
  }

  return Object.keys(questions).length === 0 ? (
    <h1>Select a category and a level od difficulty por the quiz</h1>
  ) : (
    <>
      <h2>{`Question ${currentQuestion + 1} of 20`}</h2>
      <p>{questions[`${currentQuestion}`]["question"]["text"]}</p>
      <ul>
        {shuffledArray.map((elem, index) => (
          <li key={index} onClick={() => handleSelection(index)}>{`${
            index + 1
          }) ${elem}`}</li>
        ))}
      </ul>
      <button onClick={handleNextQuestion}>Next Question</button>
    </>
  );
};

export default Question;
