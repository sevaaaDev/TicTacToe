export function Square({ onClick, value, id }) {
  function onclick() {
    onClick(id);
  }
  return (
    <button disabled={value !== "" && true} onClick={onclick} data-testid={id}>
      {value}
    </button>
  );
}

// game
// state
// if checkWin true
// render winner
//
//
// square(onSquareCLick, value, id)
