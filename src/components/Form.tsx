/* type DifficultyProps = {
  word: string[];
};
 */
/* import React, { useState } from 'react';

const YourComponent = () => {
  const [disabled, setDisabled] = useState(false);

  const handleInputChange = (event) => {
    const { value, maxLength } = event.target;
    if (value.length >= maxLength) {
      setDisabled(true);
    }
  };

  const handleBlur = () => {
    setDisabled(true);
  };

  return (
    <div>
      <input
        type="text"
        maxLength={10} // Replace with the desired maximum length
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
      />
    </div>
  );
};

export default YourComponent;
 */

/* import React, { useRef } from 'react';

const YourComponent = () => {
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const { value, maxLength } = event.target;
    if (value.length >= maxLength) {
      inputRef.current.disabled = true;
      if (inputRef.current.nextElementSibling) {
        inputRef.current.nextElementSibling.focus();
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        maxLength={10} // Replace with the desired maximum length
        onChange={handleInputChange}
        ref={inputRef}
      />
      <input type="text" />
      <input type="text" />
    </div>
  );
};

export default YourComponent; */

const Form: React.FunctionComponent = ({}) => {
  return (
    <form action="">
      <input type="text" />
      <select name="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button>Play</button>
    </form>
  );
};

export default Form;
