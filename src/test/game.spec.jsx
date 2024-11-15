import { render, screen } from "@testing-library/react";
import Game from "../App";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
describe("Full Game", () => {
  it("shows the correct player", async () => {
    const user = userEvent.setup();
    render(<Game />);
    let currentPlayer = screen.getByTestId("current-player");
    expect(currentPlayer).toHaveTextContent("X");
    const btn = screen.getByTestId("0");
    await user.click(btn);
    currentPlayer = screen.getByTestId("current-player");
    expect(currentPlayer).toHaveTextContent("O");
  });
  it("shows select player option before start", async () => {
    const user = userEvent.setup();
    render(<Game />);
  });
});
