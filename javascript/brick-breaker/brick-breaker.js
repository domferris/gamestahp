const canvas = document.getElementById("brick-breaker-canvas");
const context = canvas.getContext("2d");

// CLEAR CANVAS
context.clearRect(0, 0, 800, 600);

context.fillStyle = "red";
context.fillRect(20, 20, 100, 100);

// PADDLE
context.fillStyle = "blue";
context.fillRect(200, 200, 50, 50);
