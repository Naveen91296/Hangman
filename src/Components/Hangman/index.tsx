import { useState } from "react";
import WORDS from "../../../public/data/hangmanWords.json";

const Hangman = () => {
  const [wordToGuess, setWordToGuess] = useState<string>(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  
  return <div>Hangman {wordToGuess}</div>;
};

export default Hangman;
