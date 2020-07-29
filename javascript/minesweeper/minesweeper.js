document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let width = 10;
  let bombAmout = 20;
  let squares = [];

  // create board
  function createBoard() {
    // get shuffled game array with random bombs
    const bombsArray = Array(bombAmout).fill("bomb");
    const emptyArray = Array(width * width - bombAmout).fill("valid");
    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");

      // assign id and valid/bomb to each square
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);

      grid.appendChild(square);
      squares.push(square);
    }
  }

  createBoard();
});
