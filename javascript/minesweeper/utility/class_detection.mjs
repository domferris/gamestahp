// detect if square has bomb
const hasBomb = (square) => {
  return square.classList.contains('bomb');
};

// detect if square has flag
const hasFlag = (square) => {
  return square.classList.contains('flag');
};

// detect if square has been checked
const isChecked = (square) => {
  return square.classList.contains('checked');
};

// detect if square is valid/doesn't have a bomb
const isSafe = (square) => {
  return square.classList.contains('safe');
};

export { hasBomb, hasFlag, isChecked, isSafe };
