type HangmanDrawingProps = {
  numberOfIncorrectGuesses: number;
};
const HangmanDrawing = ({ numberOfIncorrectGuesses }: HangmanDrawingProps) => {
  
  const HEAD = <div className="head" />;
  const BODY = <div className="body" />;
  const RIGHT_ARM = <div className="right-arm" />;
  const LEFT_ARM = <div className="left-arm" />;
  const RIGHT_LEG = <div className="right-leg" />;
  const LEFT_LEG = <div className="left-leg" />;

  const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

  return (
    <div className="hangman-drawing-container">
      {BODY_PARTS.slice(0, numberOfIncorrectGuesses)}
      <div className="hook" />
      <div className="top-line" />
      <div className="stand" />
      <div className="bottom-line" />
    </div>
  );
};

export default HangmanDrawing;
