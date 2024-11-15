import { render, screen } from "@testing-library/react";
import Game from "../App";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
describe("Full Game", () => {
  it("shows the correct player", async () => {
    const user = userEvent.setup();
    render(<Game />);
    const btnStart = screen.getByText("Start");
    await user.click(btnStart);
    let currentPlayer = screen.getByTestId("current-player");
    expect(currentPlayer).toHaveTextContent("X");
    const btn = screen.getByTestId("0");
    await user.click(btn);
    currentPlayer = screen.getByTestId("current-player");
    expect(currentPlayer).toHaveTextContent("O");
  });
  it("cant play before start the game", async () => {
    const user = userEvent.setup();
    render(<Game />);
    const btn = screen.getByTestId("0");
    await user.click(btn);
    expect(btn).toBeEmptyDOMElement();
  });
  it("start the game after clicking the btn", async () => {
    const user = userEvent.setup();
    render(<Game />);
    const btnStart = screen.getByText("Start");
    const btnSquare = screen.getByTestId("0");
    await user.click(btnStart);
    await user.click(btnSquare);
    expect(btnStart).toHaveTextContent("Restart");
    expect(btnSquare).toHaveTextContent("X");
  });
  it("restart the game", async () => {
    const user = userEvent.setup();
    render(<Game />);
    const btnStart = screen.getByText("Start");
    await user.click(btnStart);
    const btnSquare = screen.getByTestId("0");
    await user.click(btnSquare);
    expect(btnSquare).toHaveTextContent("X");
    await user.click(btnStart);
    expect(btnSquare).toBeEmptyDOMElement();
  });
});
