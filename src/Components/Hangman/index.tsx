import { useCallback, useEffect, useState } from "react";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import { KEYS, randomWord } from "./Constant";

const Hangman = () => {

  const [wordToGuess, setWordToGuess] = useState<string>(randomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetters: string[] = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isWinner: boolean = wordToGuess.split("").every((e) => guessedLetters.includes(e));
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
    setWordToGuess(randomWord())
    setGuessedLetters([])
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: "110px",
        rowGap: "12px",
        padding: "12px",
        height: "100vh",
      }}
    >
      <HangmanDrawing numberOfIncorrectGuesses={incorrectLetters?.length} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
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
          <div
            style={{
              display: "flex",
              columnGap: "12px",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {isWinner ? "Winner winner! 🍗😆" : "Oops! You lost! 😅💔"}
            </div>
            <button
              onClick={restartGame}
              style={{
                padding: "4px 12px",
                fontSize: "20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {isWinner ? "Replay" : "Retry"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hangman;
