export function checkDraw(state) {
  return state.reduce((prev, curr) => {
    if (curr === "") {
      return false;
    }
    return prev;
  }, true);
}
