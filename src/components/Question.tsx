type qObject = {
  text: string;
};

type auxObject = {
  "0": string;
  "1": string;
  "2": string;
};

type QuestionObject = {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswer: auxObject;
  question: qObject;
  tags: auxObject;
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
};

type QuestionProps = {
  [key: string]: QuestionObject;
  currentQuestion: number;
  handleNextQuestion: () => void;
};

/* type QuestionProps = {
  questions: {
    id: number;
  }[];
}; */

const Question: React.FunctionComponent<QuestionProps> = ({
  questions,
  currentQuestion,
  handleNextQuestion,
}) => {
  /* console.log(`${currentQuestion}`, typeof `${currentQuestion}`);
  console.log(questions); */
  if (questions.length == 0) {
    <h1>Error</h1>;
  } else {
    return (
      <>
        <p>{questions[`${currentQuestion}`]["question"]["text"]}</p>
        <ul>
          <li>{questions[`${currentQuestion}`]["incorrectAnswers"][0]}</li>
          <li>{questions[`${currentQuestion}`]["incorrectAnswers"][1]}</li>
          <li>{questions[`${currentQuestion}`]["incorrectAnswers"][2]}</li>
        </ul>
        <button onClick={handleNextQuestion}>Next Question</button>
      </>
    );
  }
};

export default Question;
