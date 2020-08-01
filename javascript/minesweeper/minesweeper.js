document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let bombAmout = 20;
  let squares = [];

  // create board
  const createBoard = () => {
    // get shuffled game array with random bombs
    const bombsArray = Array(bombAmout).fill('bomb');
    const emptyArray = Array(width * width - bombAmout).fill('valid');
    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');

      // assign id and valid/bomb to each square
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);

      grid.appendChild(square);
      squares.push(square);

      // normal click
      square.addEventListener('click', (event) => {
        click(square);
      });
    }

    // add numbers to squares
    for (let i = 0; i < squares.length; i++) {
      let totalNum = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      // add nearby bomb distance numbers on squares that don't have bombs
      if (squares[i].classList.contains('valid')) {
        // checks if bomb is W of current square
        if (i > 0 && !isLeftEdge && hasBomb(squares[i - 1])) totalNum++;

        // checks if bomb is NE of current square
        if (i > 9 && !isRightEdge && hasBomb(squares[i + 1 - width])) totalNum++;

        // checks if bomb is N of current square
        if (i > 10 && hasBomb(squares[i - width])) totalNum++;

        // checks if bomb is NW of current square
        if (i > 11 && !isLeftEdge && hasBomb(squares[i - 1 - width])) totalNum++;

        // checks if bomb is E of current square
        if (i < 98 && !isRightEdge && hasBomb(squares[i + 1])) totalNum++;

        // checks if bomb is SW of current square
        if (i < 90 && !isLeftEdge && hasBomb(squares[i - 1 + width])) totalNum++;

        // checks if bomb is SE of current square
        if (i < 88 && !isRightEdge && hasBomb(squares[i + 1 + width])) totalNum++;

        // checks if bomb is S of current square
        if (i < 89 && hasBomb(squares[i + width])) totalNum++;

        squares[i].setAttribute('data', totalNum);
      }
    }
  };

  createBoard();
});

// detect if square has bomb
const hasBomb = (square) => {
  return square.classList.contains('bomb');
};

// square click actions
const click = (square) => {
  if (hasBomb(square)) {
    console.log('Game Over');
  } else {
    let totalNum = square.getAttribute('data');
    if (totalNum != 0) {
      square.classList.add('checked');
      square.innerHTML = totalNum;
      return;
    }
    square.classList.add('checked');
  }
};
