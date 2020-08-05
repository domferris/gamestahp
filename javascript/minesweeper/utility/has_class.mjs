// detect if square has bomb
const hasBomb = (square) => {
  return square.classList.contains('bomb');
};

// detect if square has flag
const hasFlag = (square) => {
  return square.classList.contains('flag');
};

export { hasBomb, hasFlag };
