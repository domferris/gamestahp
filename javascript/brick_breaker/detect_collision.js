export function detectCollision(ball, gameObject) {
  // BALL DETECTION
  const ballTop = ball.position.y;
  const ballBottom = ball.position.y + ball.size;

  // GAME OBJECT DETECTION
  const gameObjectTop = gameObject.position.y;
  const gameObjectLeft = gameObject.position.x;
  const gameObjectRight = gameObject.position.x + gameObject.width;
  const gameObjectBottom = gameObject.position.y + gameObject.height;

  if (
    ballBottom >= gameObjectTop &&
    ballTop <= gameObjectBottom &&
    ball.position.x >= gameObjectLeft &&
    ball.position.x + ball.size <= gameObjectRight
  ) {
    return true;
  } else {
    return false;
  }
}
