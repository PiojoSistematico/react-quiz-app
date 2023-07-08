/* from chatgpt */
export default function shuffleArray(answers: string[]) {
  let newArray: string[] = answers.slice();

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}
