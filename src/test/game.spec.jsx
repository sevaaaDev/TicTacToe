import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../App";
import { expect } from "vitest";
describe("game", () => {
  it("ends when one of player has 3 symbol in a row", async () => {
    const user = userEvent.setup();
    render(<Game />);
    let btn1 = screen.queryByTestId("1");
    let btn2 = screen.queryByTestId("2");
    let btn3 = screen.queryByTestId("3");
    let btn4 = screen.queryByTestId("4");
    let btn5 = screen.queryByTestId("5");
    let btn6 = screen.queryByTestId("6");
    await user.click(btn1);
    await user.click(btn4);
    await user.click(btn2);
    await user.click(btn5);
    await user.click(btn3);
    //    let winner = screen.getByText("You WIN");
    expect(winner).toHaveTextContent("You WIN");
  });
  it("ends when one of player has 3 symbol in a column");
  it("ends when one of player has 3 symbol in a diagonally");
  it("is draw when no win and every field is not empty");
});
