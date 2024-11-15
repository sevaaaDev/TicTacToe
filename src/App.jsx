import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { CurrentPlayer } from "./components/CurrentPlayer";

function Game() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isPlaying, setIsPlaying] = useState(false);
  function switchPlayer() {
    if (currentPlayer === "X") {
      setCurrentPlayer("O");
      return;
    }
    setCurrentPlayer("X");
  }
  // add select player option on start
  // add btn to start
  // add btn to play again
  return (
    <div>
      {isPlaying && <CurrentPlayer currentPlayer={currentPlayer} />}
      <Board currentPlayer={currentPlayer} switchPlayer={switchPlayer} />
    </div>
  );
}

export default Game;
