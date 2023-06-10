type FormProps = {
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form: React.FunctionComponent<FormProps> = ({ handleSearch }) => {
  const categories: string[] = [
    "geography",
    "film_and_tv",
    "science",
    "film",
    "music",
    "society_and_culture",
    "arts_and_literature",
    "history",
    "food_and_drink",
    "general_knowledge",
    "people",
    "sport",
    "acting",
    "words",
    "literature",
    "songs",
    "food",
    "language",
    "cities",
    "quotes",
  ];
  return (
    <form action="" onSubmit={handleSearch}>
      <select name="category" defaultValue={categories[0]}>
        {categories.map((elem, index) => (
          <option key={index} value={elem}>
            {elem}
          </option>
        ))}
      </select>
      <select name="difficulty" defaultValue={"easy"}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit">Search new questions</button>
    </form>
  );
};

export default Form;
