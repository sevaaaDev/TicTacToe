export function Square({ onClick, value, id, disable }) {
  function onclick() {
    onClick(id);
  }
  return (
    <button
      disabled={(value !== "" && true) || disable}
      onClick={onclick}
      data-testid={id}
    >
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
