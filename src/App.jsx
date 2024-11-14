import { useState } from "react";
import Square from "./components/Square";
import "./App.css";

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
};

function Board() {
  const [state, setState] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  function onSquareClick(id) {
    setState(
      state.map((el, index) => {
        if (index === id) {
          return currentPlayer;
        }
        return el;
      }),
    );
    switchPlayer();
  }
  function switchPlayer() {
    if (currentPlayer === "X") {
      setCurrentPlayer("O");
      return;
    }
    setCurrentPlayer("X");
  }
  return (
    <>
      <div style={grid}>
        <Square onClick={onSquareClick} value={state[0]} id={0} />
        <Square onClick={onSquareClick} value={state[1]} id={1} />
        <Square onClick={onSquareClick} value={state[2]} id={2} />
        <Square onClick={onSquareClick} value={state[3]} id={3} />
        <Square onClick={onSquareClick} value={state[4]} id={4} />
        <Square onClick={onSquareClick} value={state[5]} id={5} />
        <Square onClick={onSquareClick} value={state[6]} id={6} />
        <Square onClick={onSquareClick} value={state[7]} id={7} />
        <Square onClick={onSquareClick} value={state[8]} id={8} />
      </div>
    </>
  );
}

export default Board;
