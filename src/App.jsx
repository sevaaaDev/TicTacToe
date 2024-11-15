import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { CurrentPlayer } from "./components/CurrentPlayer";

function Game({ init = ["", "", "", "", "", "", "", "", ""] }) {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isPlaying, setIsPlaying] = useState(false);
  const [state, setState] = useState(init);
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
    setState(Array(9).fill(""));
  }
  // add select player option on start (later)
  // add btn to start
  // add btn to play again
  return (
    <div>
      {isPlaying && <CurrentPlayer currentPlayer={currentPlayer} />}
      <Board
        state={state}
        setState={setState}
        currentPlayer={currentPlayer}
        switchPlayer={switchPlayer}
        isPlaying={isPlaying}
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
