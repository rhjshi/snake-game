function updateSnake() {
  // check if we should draw yet
  snakeFrameCounter = (snakeFrameCounter+1) % SnakeFPS;
  if (snakeFrameCounter !== 0) return Collision.None;
  
  // check if we need to change direction
  if (directionBuffer.length > 0) {
    const want = directionBuffer.shift();
      if (direction !== OppositeDirection.get(want)) 
        direction = want;
  }
  
  // create new piece 
  const newHead = createVector(Snake[0].x, Snake[0].y);
  const v = DirectionMap.get(direction);
  newHead.add(v);

  // add piece to snake head
  Snake.unshift(newHead);

  // handle collisions
  const state = checkCollision();
  if (state !== Collision.Apple) {
    Snake.pop();
  }

  return state;
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

function isOnSnake(x, y, ignoreHead = false) {
  let i = ignoreHead ? 1 : 0;

  for (; i < Snake.length; ++i) {
    if (Snake[i].x === x && Snake[i].y === y) return true;
  }
  return false;
}
