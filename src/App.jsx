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
  let isGameOver;
  let [isWin, coordinate] = checkWinner(board);
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
    <>
      <div className="board-wrapper">
        {isPlaying && !isGameOver && (
          <CurrentPlayer currentPlayer={currentPlayer} />
        )}
        {isGameOver && (
          <p className="current-player">{isWin ? `${isWin} WIN` : "Draw"}</p>
        )}
        {!isPlaying && !isGameOver && (
          <p className="current-player">Press Start to play</p>
        )}
        <Board
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          switchPlayer={switchPlayer}
          isPlaying={isPlaying && !isGameOver}
          winnerCoordinate={coordinate}
        />
      </div>
      {isPlaying ? (
        <button className="control-btn" onClick={restart}>
          Restart
        </button>
      ) : (
        <button className="control-btn" onClick={startGame}>
          Start
        </button>
      )}
    </>
  );
}

export default Game;
