import { Square } from "./Square";
import { checkWinner } from "../utils/checkWinner";
import { checkDraw } from "../utils/checkDraw";

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
};

export function Board({
  board,
  setBoard,
  currentPlayer,
  switchPlayer,
  isPlaying = true,
}) {
  function onSquareClick(id) {
    setBoard(
      board.map((el, index) => {
        if (index === id) {
          return currentPlayer;
        }
        return el;
      }),
    );
    switchPlayer();
  }

  return (
    <>
      <div style={grid}>
        {board.map((_, i) => (
          <Square
            onClick={onSquareClick}
            value={board[i]}
            id={i}
            disable={!isPlaying}
            key={i}
          />
        ))}
      </div>
    </>
  );
}
