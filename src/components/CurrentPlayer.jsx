export function CurrentPlayer({ currentPlayer }) {
  return (
    <p data-testid="current-player" className="current-player">
      {currentPlayer}
    </p>
  );
}
