type HangmanWordProps = {
  wordToGuess: string;
  guessedLetters: string[];
  revealLetters?: boolean;
};
const HangmanWord = ({
  guessedLetters,
  wordToGuess,
  revealLetters = false,
}: HangmanWordProps) => {
  return (
    <h1 className="hangman-word-container">
      {wordToGuess?.split("")?.map((letter, index) => {
        const showResultsColor =
          revealLetters && !guessedLetters.includes(letter)
            ? "#CF0F47ed"
            : "black";
        return (
          <div
            style={{
              borderBottom: `10px solid  ${showResultsColor}`,
              width: "50px",
              textAlign: "center",
            }}
            key={`${index}letter`}
          >
            <span
              style={{
                visibility:
                  guessedLetters?.includes(letter.toLowerCase()) ||
                  revealLetters
                    ? "visible"
                    : "hidden",
                color: showResultsColor,
              }}
            >
              {letter}
            </span>
          </div>
        );
      })}
    </h1>
  );
};

export default HangmanWord;
