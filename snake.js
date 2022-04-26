function updateSnake() {
  snakeFrameCounter = (snakeFrameCounter+1) % SnakeFPS;
  if (snakeFrameCounter !== 0) return Collision.None;
  
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

  return checkCollision();
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

function isOnSnake(x, y) {
  for (let i = 0; i < Snake.length; ++i) {
    if (Snake[i].x === x && Snake[i].y === y) return true;
  }
  return false;
}
