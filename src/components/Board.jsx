import { Square } from "./Square";
import { checkWinner } from "../utils/checkWinner";
import { checkDraw } from "../utils/checkDraw";

export function Board({
  board,
  setBoard,
  currentPlayer,
  switchPlayer,
  winnerCoordinate,
  isPlaying = true,
}) {
  if (winnerCoordinate === null) {
    winnerCoordinate = [];
  }
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
      <div className="grid">
        {board.map((_, i) => (
          <Square
            onClick={onSquareClick}
            value={board[i]}
            id={i}
            disable={!isPlaying}
            key={i}
            win={winnerCoordinate.includes(i)}
          />
        ))}
      </div>
    </>
  );
}
