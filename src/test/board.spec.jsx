import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Board } from "../components/Board";
import { expect } from "vitest";
describe("game", () => {
  it("add currentPlayer symbol to square when click", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();
    render(<Board switchPlayer={fn} currentPlayer={"X"} />);
    let btn1 = screen.getByTestId("0");
    await user.click(btn1);
    expect(btn1).toBeInTheDocument();
  });
  it("ends when one of player has 3 symbol in a row", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();
    render(<Board switchPlayer={fn} currentPlayer={"X"} />);
    let btn1 = screen.getByTestId("0");
    let btn2 = screen.getByTestId("3");
    let btn3 = screen.getByTestId("6");
    await user.click(btn1);
    await user.click(btn2);
    await user.click(btn3);
    let winner = screen.getByText("X WIN");
    expect(winner).toBeInTheDocument();
  });
  it("ends when one of player has 3 symbol in a column", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();
    render(<Board switchPlayer={fn} currentPlayer={"X"} />);
    let btn1 = screen.getByTestId("0");
    let btn2 = screen.getByTestId("1");
    let btn3 = screen.getByTestId("2");
    await user.click(btn1);
    await user.click(btn2);
    await user.click(btn3);
    let winner = screen.getByText("X WIN");
    expect(winner).toBeInTheDocument();
  });
  it("ends when one of player has 3 symbol in a diagonal", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();
    render(<Board switchPlayer={fn} currentPlayer={"X"} />);
    let btn1 = screen.getByTestId("0");
    let btn2 = screen.getByTestId("4");
    let btn3 = screen.getByTestId("8");
    await user.click(btn1);
    await user.click(btn2);
    await user.click(btn3);
    let winner = screen.getByText("X WIN");
    expect(winner).toBeInTheDocument();
  });
  it("is draw when no win and every field is not empty", async () => {
    throw "figure out how to change player on Board component";
  });
});
