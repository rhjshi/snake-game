/*
  https://p5js.org/get-started/

  StartTime: 12:55am
  
  Day 1
  - Basic board and snake with bare bones movement
  
  Day 2
  - add game score
  - collision status and detection
  - input handling polished
  - 
  
*/

let direction = "d";
let snakeFrameCounter = SnakeFPS; 
let gameScore = 0;

/*
  Built-ins
*/
function setup() { 
  createCanvas(BlockWidth*BoardWidth, BlockWidth*BoardHeight + 50);
  frameRate(30);
  
  
  Snake.push(createVector(4, 1));
  Snake.push(createVector(3, 1));
  Snake.push(createVector(2, 1));
  Snake.push(createVector(1, 1));
  
  // console.log(createVector(0, 0) == createVector(0, 0))
}

function draw() {
  drawBackground();
  
  const state = updateSnake();
  
  drawSnake();
  drawApple();

  if (state === Collision.None) {
    updateStatus(`Score: ${gameScore}`);
  } else if (state === Collision.Kill) {
    endGame();
  } else if (state === Collision.Apple) {
    gameScore += 1;
    moveApple();
  }

}

/*
*/

function updateStatus(s) {
  fill(238,238,210)
  text(s, 20, BlockWidth*BoardHeight + 30)
}

function endGame() {
  noLoop();
  updateStatus(`Game Over! Your score is ${gameScore}`);
}


function checkCollision() {
  const x = Snake[0].x;
  const y = Snake[0].y;

  if (x === Apple.x && y === Apple.y) {
    return Collision.Apple;
  }

  if (
    x < 0 || x >= BoardWidth ||
    y < 0 || y >= BoardHeight ||
    isOnSnake(x, y, true)
  ) {
    return Collision.Kill;
  }
  
  return Collision.None;
}

const directionBuffer = [];
function keyPressed() {
  if (directionBuffer.length >= 2) return;
  
  if (KeyMappings.get(keyCode))
    directionBuffer.push(KeyMappings.get(keyCode));
}

/*
  functions to draw the board only
*/
function pickFill(i, j) {
  if (i % 2 == 0 && j % 2 == 0 || i % 2 == 1 && j % 2 == 1)
    return fill(238,238,210);
  fill(77,87,100);
}
function drawBackground() {
  background(77,87,100);

  stroke(100)
  for (let i = 0; i < BoardHeight; ++i) {
    for (let j = 0; j < BoardWidth; ++j) {
      pickFill(i, j)
      rect(i*BlockWidth, j*BlockWidth, BlockWidth, BlockWidth);
    }    
  }
}
