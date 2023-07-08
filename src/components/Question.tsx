import { useEffect, useState } from "react";
import shuffleArray from "../helpers/shuffleArray";
import correct from "../assets/circle-check-regular.svg";
import incorrect from "../assets/circle-xmark-regular.svg";

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
  correctCount: number;
  setCorrectCount: React.Dispatch<React.SetStateAction<number>>;
};

const Question: React.FunctionComponent<QuestionProps> = ({
  questions,
  currentQuestion,
  handleNextQuestion,
  correctCount,
  setCorrectCount,
}) => {
  const [isSelected, setIsSelected] = useState([false, false, false, false]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shuffledArray, setShuffledArray] = useState(["", "", "", ""]);

  // Shuffling the array of options only when the currentQuestion Changes
  useEffect(() => {
    if (Object.keys(questions).length !== 0) {
      if (questions[currentQuestion]) {
        const answerArray: string[] = [
          questions[currentQuestion].correctAnswer,
          ...questions[currentQuestion].incorrectAnswers,
        ];
        setShuffledArray(shuffleArray(answerArray));
        setIsSubmitted(false);
        setIsSelected([false, false, false, false]);
      }
    }
  }, [currentQuestion, questions]);

  let correctIndex: number = -1;
  if (questions[currentQuestion])
    correctIndex = shuffledArray.indexOf(
      questions[currentQuestion].correctAnswer
    );
  /* console.log(correctIndex);
  console.log(isSelected);
  console.log(isSubmitted); */

  let selectedAnswer: boolean = isSelected.some((elem) => elem == true);
  const numberOfQuestions: number = Object.keys(questions).length;

  function handleClick(index: number): void {
    let newSelection: boolean[] = [false, false, false, false];
    newSelection[index] = true;
    setIsSelected(newSelection);
  }

  function handleSelection(): void {
    if (isSelected.indexOf(true) == correctIndex)
      setCorrectCount((prev) => prev + 1);
    setIsSubmitted(true);
  }

  return numberOfQuestions === 0 ? (
    <section className="question-section">
      <h1>Select a category and a level of difficulty por the quiz</h1>
    </section>
  ) : currentQuestion < numberOfQuestions ? (
    <section className="question-section">
      <h2>
        Question <strong>{currentQuestion + 1}</strong> of {numberOfQuestions}
      </h2>
      <p>{questions[`${currentQuestion}`]["question"]["text"]}</p>
      <ul className={isSubmitted ? "regular-ul disabled" : "regular-ul"}>
        {shuffledArray.map((elem, index) => (
          <li
            key={index}
            className={isSelected[index] ? "options selection" : "options"}
            onClick={() => handleClick(index)}
          >
            {`${index + 1}) ${elem}`}{" "}
            {isSubmitted ? (
              index == correctIndex ? (
                <img src={correct} className="correct" alt="" />
              ) : (
                <img src={incorrect} className="incorrect" alt="" />
              )
            ) : null}
          </li>
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
  ) : (
    <section className="section-results">
      <p>
        You got right <strong>{correctCount}</strong> out of{" "}
        <strong>{numberOfQuestions}</strong> questions{" "}
      </p>{" "}
      <p>
        {" ( "}
        <strong>{(correctCount * 100) / numberOfQuestions} %</strong> {" ) "}
      </p>
    </section>
  );
};

export default Question;
