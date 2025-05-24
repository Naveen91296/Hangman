import { useCallback, useEffect, useState } from "react";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import { KEYS, randomWord } from "./Constant";
import "../../styles/hangman.css";

const Hangman = () => {
  const [wordToGuess, setWordToGuess] = useState<string>(randomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetters: string[] = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isWinner: boolean = wordToGuess
    .split("")
    .every((e) => guessedLetters.includes(e));
  const isLoser: boolean = incorrectLetters.length >= 6;

  const addGuessedLetters = useCallback(
    (key: string) => {
      if (guessedLetters?.includes(key) || isWinner || isLoser) return;
      setGuessedLetters((p) => [...p, key]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!KEYS.includes(key)) return;
      e.preventDefault();
      addGuessedLetters(key);
    };
    document.addEventListener("keypress", handler);

    return () => document.removeEventListener("keypress", handler);
  }, [guessedLetters]);

  const restartGame = () => {
    setWordToGuess(randomWord());
    setGuessedLetters([]);
  };

  return (
    <div className="hangman-container">
      <HangmanDrawing numberOfIncorrectGuesses={incorrectLetters?.length} />
      <div className="word-keyboard-section">
        <HangmanWord
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
          revealLetters={isLoser}
        />
        <Keyboard
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inActiveLetters={incorrectLetters}
          addGuessedLetters={addGuessedLetters}
          disableAllButtons={isWinner || isLoser}
        />
        {(isWinner || isLoser) && (
          <div className="result-container">
            <div className="result">
              {isWinner ? "Winner winner! 🍗😆" : "Oops! You lost! 😅💔"}
            </div>
            <button onClick={restartGame} className="reset-button">
              {isWinner ? "Replay" : "Retry"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hangman;
