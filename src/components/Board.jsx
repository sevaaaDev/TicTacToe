import { Square } from "./Square";
import { checkWinner } from "../utils/checkWinner";
import { checkDraw } from "../utils/checkDraw";

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
};

export function Board({
  state,
  setState,
  currentPlayer,
  switchPlayer,
  isPlaying = true,
}) {
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
        <Square
          onClick={onSquareClick}
          value={state[0]}
          id={0}
          disable={!isPlaying}
        />
        <Square
          onClick={onSquareClick}
          value={state[1]}
          id={1}
          disable={!isPlaying}
        />
        <Square
          onClick={onSquareClick}
          value={state[2]}
          id={2}
          disable={!isPlaying}
        />
        <Square
          onClick={onSquareClick}
          value={state[3]}
          id={3}
          disable={!isPlaying}
        />
        <Square
          onClick={onSquareClick}
          value={state[4]}
          id={4}
          disable={!isPlaying}
        />
        <Square
          onClick={onSquareClick}
          value={state[5]}
          id={5}
          disable={!isPlaying}
        />
        <Square
          onClick={onSquareClick}
          value={state[6]}
          id={6}
          disable={!isPlaying}
        />
        <Square
          onClick={onSquareClick}
          value={state[7]}
          id={7}
          disable={!isPlaying}
        />
        <Square
          onClick={onSquareClick}
          value={state[8]}
          id={8}
          disable={!isPlaying}
        />
      </div>
    </>
  );
}
