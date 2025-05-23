import { useState } from "react";
import WORDS from "../../data/hangmanWords.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

const Hangman = () => {
  const [wordToGuess, setWordToGuess] = useState<string>(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <h3>Hangman header</h3>
      <HangmanDrawing />
      <HangmanWord />
      <Keyboard />
    </div>
  );
};

export default Hangman;
