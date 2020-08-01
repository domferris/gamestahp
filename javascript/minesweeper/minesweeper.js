document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let bombAmout = 20;
  let squares = [];
  let isGameOver = false;

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

  // square click actions
  const click = (square) => {
    let currentId = square.id;

    // if (isGameOver) return;

    if (square.classList.contains('checked') || square.classList.contains('flag')) return;

    if (hasBomb(square)) {
      console.log('Game Over');
      // isGameOver = true;
    } else {
      let totalNum = square.getAttribute('data');

      if (totalNum != 0) {
        square.classList.add('checked');
        square.innerHTML = totalNum;
        return;
      }

      checkSquare(square, currentId);
    }
    square.classList.add('checked');
  };

  // check neighboring squares
  const checkSquare = (square, currentId) => {
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      // checks square W to current square
      if (currentId > 0 && !isLeftEdge) {
        const newId = parseInt(currentId) - 1;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // checks square N to current square
      if (currentId > 10) {
        const newId = parseInt(currentId) - width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // checks square NE to current square
      if (currentId > 9 && !isRightEdge) {
        const newId = parseInt(currentId) + 1 - width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  };
});

// detect if square has bomb
const hasBomb = (square) => {
  return square.classList.contains('bomb');
};
