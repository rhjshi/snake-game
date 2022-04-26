/*
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
  
  updateSnake();

  const state = checkCollision();
  
  drawSnake();
  
  if (state === Collision.Kill) {
    endGame();
  } else if (state === Collision.None) {
    updateStatus(`Score: ${gameScore}`);
  }

}

function updateStatus(s) {
  fill(238,238,210)
  text(s, 20, BlockWidth*BoardHeight + 30)
}
/*

*/

function endGame() {
  noLoop();
  updateStatus(`Game Over! Your score is ${gameScore}`);
}


function checkCollision() {
  if (
    Snake[0].x < 0 || Snake[0].x >= BoardWidth ||
    Snake[0].y < 0 || Snake[0].y >= BoardHeight
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

function updateSnake() {
  snakeFrameCounter = (snakeFrameCounter+1) % SnakeFPS;
  if (snakeFrameCounter !== 0) return;
  
  if (directionBuffer.length > 0) {
    const want = directionBuffer.shift();
      if (direction !== OppositeDirection.get(want)) 
        direction = want;
  }
  
  Snake.pop();
  const newHead = createVector(Snake[0].x, Snake[0].y);

  const v = DirectionMap.get(direction);
  newHead.add(v);
  
  Snake.unshift(newHead);
}

function drawSnake() {
  stroke(118,150,86)
  strokeWeight(BlockWidth*3/4)
  for (let i = 0; i < Snake.length-1; ++i) {
    const ends = [Snake[i].x, Snake[i].y, Snake[i+1].x, Snake[i+1].y];
    
    line(...ends.map(v => Offset(v)))
  }
  strokeWeight(1)
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