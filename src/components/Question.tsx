import { useEffect, useState } from "react";
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
  const [isSelected, setIsSelected] = useState([false, false, false, false]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  let selectedAnswer: boolean = isSelected.some((elem) => elem == true);

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

  function handleClick(index: number): void {
    let newSelection: boolean[] = [false, false, false, false];
    newSelection[index] = true;
    setIsSelected(newSelection);
  }

  function handleSelection(): void {
    setIsSubmitted(true);
    setIsSelected([false, false, false, false]);
  }

  return Object.keys(questions).length === 0 ? (
    <section className="question-section">
      <h1>Select a category and a level od difficulty por the quiz</h1>
    </section>
  ) : (
    <section className="question-section">
      <h2>
        Question <strong>{currentQuestion + 1}</strong> of 20
      </h2>
      <p>{questions[`${currentQuestion}`]["question"]["text"]}</p>
      <ul className={isSubmitted ? "regular-ul disabled" : "regular-ul"}>
        {shuffledArray.map((elem, index) => (
          <li
            key={index}
            className={isSelected[index] ? "options selection" : "options"}
            onClick={() => handleClick(index)}
          >{`${index + 1}) ${elem}`}</li>
        ))}
      </ul>
      <button
        className="btn-select-answer"
        onClick={handleSelection}
        disabled={!selectedAnswer}
      >
        Select Answer
      </button>
      <button
        className="btn-next-question"
        onClick={handleNextQuestion}
        disabled={!isSubmitted}
      >
        Next Question
      </button>
    </section>
  );
};

export default Question;
