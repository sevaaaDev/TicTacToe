import { checkWinner } from "../utils/checkWinner";
describe("Check winner function", () => {
  it("return the winner", () => {
    const state = ["X", "", "", "X", "", "", "X", "", ""];
    let result = checkWinner(state);
    expect(result).toBe("X");
  });
  it("return no winner", () => {
    const state = ["X", "", "", "", "", "", "X", "", ""];
    let result = checkWinner(state);
    expect(result).toBe(null);
  });
});
