import { hasBomb, hasFlag } from './utility/has_class.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let bombAmount = 20;
  let flags = 0;
  let squares = [];
  let isGameOver = false;

  const flagDisplay = document.querySelector('.current-flag-display');
  flagDisplay.innerHTML = bombAmount - flags;

  // create board
  const createBoard = () => {
    // get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width * width - bombAmount).fill('valid');
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

      // ctrl+click
      square.oncontextmenu = (event) => {
        event.preventDefault();
        addFlag(square);
      };
    }

    // add numbers to squares
    for (let i = 0; i < squares.length; i++) {
      let totalNum = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      // add nearby bomb distance numbers on squares that don't have bombs
      if (squares[i].classList.contains('valid')) {
        // checks if bomb is NW of current square
        if (i > 11 && !isLeftEdge && hasBomb(squares[i - 1 - width])) totalNum++;

        // checks if bomb is N of current square
        if (i > 10 && hasBomb(squares[i - width])) totalNum++;

        // checks if bomb is NE of current square
        if (i > 9 && !isRightEdge && hasBomb(squares[i + 1 - width])) totalNum++;

        // checks if bomb is W of current square
        if (i > 0 && !isLeftEdge && hasBomb(squares[i - 1])) totalNum++;

        // checks if bomb is E of current square
        if (i < 98 && !isRightEdge && hasBomb(squares[i + 1])) totalNum++;

        // checks if bomb is SW of current square
        if (i < 90 && !isLeftEdge && hasBomb(squares[i - 1 + width])) totalNum++;

        // checks if bomb is S of current square
        if (i < 89 && hasBomb(squares[i + width])) totalNum++;

        // checks if bomb is SE of current square
        if (i < 88 && !isRightEdge && hasBomb(squares[i + 1 + width])) totalNum++;

        squares[i].setAttribute('data', totalNum);
      }
    }
  };

  createBoard();

  const addFlag = (square) => {
    if (isGameOver) return;
    if (!square.classList.contains('checked') && flags < bombAmount) {
      if (!hasFlag(square)) {
        square.classList.add('flag');
        square.innerHTML = '🚩';
        flags++;
        flagDisplay.innerHTML = bombAmount - flags;

        checkForWin();
      } else {
        square.classList.remove('flag');
        square.innerHTML = '';
        flags--;
        flagDisplay.innerHTML = bombAmount - flags;
      }
    }
  };

  // square click actions
  const click = (square) => {
    let currentId = square.id;

    if (isGameOver) return;

    if (square.classList.contains('checked') || hasFlag(square)) return;

    if (hasBomb(square)) {
      square.style.backgroundColor = 'rgb(248, 6, 12)';
      gameOver(square);
    } else {
      let totalNum = square.getAttribute('data');

      if (totalNum != 0) {
        square.classList.add('checked');
        if (totalNum == 1) square.classList.add('one');
        if (totalNum == 2) square.classList.add('two');
        if (totalNum == 3) square.classList.add('three');
        if (totalNum == 4) square.classList.add('four');
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
      // checks square NW to current square
      if (currentId > 11 && !isLeftEdge) {
        const newId = parseInt(currentId) - 1 - width;
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

      // checks square W to current square
      if (currentId > 0 && !isLeftEdge) {
        const newId = parseInt(currentId) - 1;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // checks square E to current square
      if (currentId < 98 && !isRightEdge) {
        const newId = parseInt(currentId) + 1;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // checks square SW to current square
      if (currentId < 90 && !isLeftEdge) {
        const newId = parseInt(currentId) - 1 + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // checks square S to current square
      if (currentId < 89) {
        const newId = parseInt(currentId) + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // checks square SE to current square
      if (currentId < 88 && !isRightEdge) {
        const newId = parseInt(currentId) + 1 + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  };

  // game over
  const gameOver = (square) => {
    console.log('BOOM game over');
    isGameOver = true;

    // reveal bomb locations
    squares.forEach((square) => {
      if (hasBomb(square) && hasFlag(square)) {
        square.style.backgroundColor = 'rgb(100, 216, 100)';
        square.innerHTML = '🚩';
      } else if (hasBomb(square)) {
        square.innerHTML = '💣';
      }
    });
  };

  // check for win
  const checkForWin = () => {
    let matches = 0;

    for (let i = 0; i < squares.length; i++) {
      if (hasFlag(squares[i]) && hasBomb(squares[i])) {
        matches++;
      }

      if (matches === bombAmount) {
        console.log('WIN');
        isGameOver = true;
      }
    }
  };
});
