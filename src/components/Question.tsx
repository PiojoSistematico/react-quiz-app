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
  let answerArray: string[] =
    Object.keys(questions).length === 0
      ? ["X,X,X,X"]
      : [
          questions[`${currentQuestion}`]["correctAnswer"],
          ...questions[`${currentQuestion}`]["incorrectAnswers"],
        ];

  let shuffledArray = shuffleArrayWithIndex(answerArray);
  let correctIndex =
    Object.keys(questions).length === 0
      ? 0
      : shuffledArray.indexOf(questions[`${currentQuestion}`]["correctAnswer"]);
  console.log(correctIndex);

  return Object.keys(questions).length === 0 ? (
    <h1>Error</h1>
  ) : (
    <>
      <p>{questions[`${currentQuestion}`]["question"]["text"]}</p>
      <ul>
        {shuffledArray.map((elem, index) => (
          <li key={index}>{`${index + 1}) ${elem}`}</li>
        ))}
      </ul>
      <button onClick={handleNextQuestion}>Next Question</button>
    </>
  );
};

export default Question;
