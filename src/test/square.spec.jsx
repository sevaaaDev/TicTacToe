import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Square } from "../components/Square.jsx";
import { expect } from "vitest";
describe("square", () => {
  it("call the function given as prop when clicked", async () => {
    const setState = vi.fn();
    const user = userEvent.setup();
    render(<Square onClick={setState} value="" id="0" />);
    let btn = screen.getByRole("button");
    await user.click(btn);
    expect(setState).toHaveBeenCalledOnce();
  });
  it("doesnt call the function if the square is not empty", async () => {
    let val = "";
    const setState = vi.fn(() => {
      val = "X";
    });
    const user = userEvent.setup();
    let { rerender } = render(<Square onClick={setState} value={val} id="0" />);
    let btn = screen.getByRole("button");
    await user.click(btn);
    expect(setState).toHaveBeenCalledOnce();
    rerender();
    await user.click(btn);
    expect(setState).toHaveBeenCalledOnce();
  });
});
