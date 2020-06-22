import Brick from "./brick.js";

export function buildLevel(game, level) {
  const bricks = [];

  level.map((row, rowIndex) => {
    row.map((brick, brickIndex) => {
      if (brick === 1) {
        const position = { x: 80 * brickIndex, y: 60 + 24 * rowIndex };
        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

export const level1 = [
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];