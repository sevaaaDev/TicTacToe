import { render, screen } from "@testing-library/react";
import Game from "../App";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
describe("Game play", () => {
  it("add currentPlayer symbol to square when click", async () => {
    const user = userEvent.setup();
    const initBoard = ["", "", "X", "O", "X", "X", "O", "X", ""];
    render(<Game init={initBoard} />);
    const btnStart = screen.getByText("Start");
    await user.click(btnStart);
    let btn1 = screen.getByTestId("0");
    await user.click(btn1);
    expect(btn1).toHaveTextContent("X");
  });
  it("ends when one of player has 3 symbol in a row", async () => {
    const user = userEvent.setup();
    const initBoard = ["X", "", "", "X", "", "", "", "", ""];
    render(<Game init={initBoard} />);
    const btnStart = screen.getByText("Start");
    await user.click(btnStart);
    let btn3 = screen.getByTestId("6");
    await user.click(btn3);
    let winner = screen.getByText("X WIN");
    expect(winner).toBeInTheDocument();
  });
  it("ends when one of player has 3 symbol in a column", async () => {
    const user = userEvent.setup();
    const initBoard = ["X", "X", "", "", "", "", "", "", ""];
    render(<Game init={initBoard} />);
    const btnStart = screen.getByText("Start");
    await user.click(btnStart);
    let btn3 = screen.getByTestId("2");
    await user.click(btn3);
    let winner = screen.getByText("X WIN");
    expect(winner).toBeInTheDocument();
  });
  it("ends when one of player has 3 symbol in a diagonal", async () => {
    const user = userEvent.setup();
    const initBoard = ["X", "", "", "", "X", "", "", "", ""];
    render(<Game init={initBoard} />);
    const btnStart = screen.getByText("Start");
    await user.click(btnStart);
    let btn3 = screen.getByTestId("8");
    await user.click(btn3);
    let winner = screen.getByText("X WIN");
    expect(winner).toBeInTheDocument();
  });
  it("shows draw ", async () => {
    const user = userEvent.setup();
    const initBoard = ["X", "O", "X", "O", "X", "X", "O", "", "O"];
    render(<Game init={initBoard} />);
    const btnStart = screen.getByText("Start");
    await user.click(btnStart);
    const btnSquare = screen.getByTestId("7");
    await user.click(btnSquare);
    const draw = screen.getByText("Draw");
    expect(btnStart).toHaveTextContent("Restart");
    expect(draw).toBeInTheDocument();
  });
});
