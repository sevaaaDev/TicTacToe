export function Square({ onClick, value, id, disable, win }) {
  function onclick() {
    onClick(id);
  }
  return (
    <button
      disabled={(value !== "" && true) || disable}
      onClick={onclick}
      data-testid={id}
      className={win ? "square win" : "square"}
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
