import { useState } from "react";
import { Square } from "./Square";
import { checkWinner } from "../utils/checkWinner";
import { checkDraw } from "../utils/checkDraw";

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
};

export function Board({ currentPlayer, switchPlayer }) {
  const [state, setState] = useState(Array(9).fill(""));
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
  let isWin = checkWinner(state);
  if (isWin) {
    return <p>{isWin} WIN</p>;
  }
  let isDraw = checkDraw(state);
  if (isDraw) {
    return <p>Draw</p>;
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
