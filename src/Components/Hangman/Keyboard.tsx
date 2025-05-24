import { KEYS } from "./Constant";
import "../../styles/keyboard.css";
type KeyboardProps = {
  activeLetters: string[];
  inActiveLetters: string[];
  addGuessedLetters: (key: string) => void;
  disableAllButtons?: boolean;
};
const Keyboard = ({
  activeLetters,
  inActiveLetters,
  addGuessedLetters,
  disableAllButtons = false,
}: KeyboardProps) => {
  return (
    <div className="keyboard-container">
      {KEYS.map((c) => {
        return (
          <button
            disabled={
              [...activeLetters, ...inActiveLetters].includes(c) ||
              disableAllButtons
            }
            onClick={() => addGuessedLetters(c)}
            className={`btn ${
              activeLetters.includes(c)
                ? "btn-active"
                : inActiveLetters?.includes(c)
                ? "btn-inactive"
                : ""
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
