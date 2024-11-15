import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { CurrentPlayer } from "./components/CurrentPlayer";
import { checkWinner } from "./utils/checkWinner";
import { checkDraw } from "./utils/checkDraw";

function Game({ init = ["", "", "", "", "", "", "", "", ""] }) {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isPlaying, setIsPlaying] = useState(false);
  const [board, setBoard] = useState(init);
  function switchPlayer() {
    if (currentPlayer === "X") {
      setCurrentPlayer("O");
      return;
    }
    setCurrentPlayer("X");
  }
  function startGame() {
    setIsPlaying(true);
  }
  function restart() {
    setCurrentPlayer("X");
    setIsPlaying(false);
    setBoard(Array(9).fill(""));
  }
  let isGameOver = checkWinner(board);
  let isWin = checkWinner(board);
  if (isWin) {
    isGameOver = true;
  }
  let isDraw = checkDraw(board);
  if (isDraw) {
    isGameOver = true;
  }

  // add select player option on start (later)
  // add btn to start
  // add btn to play again
  return (
    <div>
      {isPlaying && !isGameOver && (
        <CurrentPlayer currentPlayer={currentPlayer} />
      )}
      {isGameOver && (isWin ? <p>{isWin} WIN</p> : <p>Draw</p>)}
      <Board
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        switchPlayer={switchPlayer}
        isPlaying={isPlaying && !isGameOver}
      />
      {isPlaying ? (
        <button onClick={restart}>Restart</button>
      ) : (
        <button onClick={startGame}>Start</button>
      )}
    </div>
  );
}

export default Game;
