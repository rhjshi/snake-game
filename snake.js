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

  if ( isOnSnake(Snake[0].x, Snake[0].y, true) ) return Collision.Kill;

  return state;
}

function testDrawSnake() {
  // draws the true representation of the snake
  // no animations or anything like that
  stroke(0);
  strokeWeight(BlockWidth*1/4);
  for (let i = 0; i < Snake.length-1; ++i) {
    const ends = [Snake[i].x, Snake[i].y, Snake[i+1].x, Snake[i+1].y].map(v => Offset(v));
    line(...ends);
  }
  strokeWeight(1);
}

function drawSnake() {
  stroke(118,150,86)
  strokeWeight(BlockWidth*3/4)
  
  // how far into the animation are we
  const percentage = snakeFrameCounter / SnakeFPS;
  
// ------- let's try something lmao --------- 
  let d = direction;
  if (
    directionBuffer.length > 0 && 
    OppositeDirection.get(directionBuffer[0]) !== d
  ) {
    d = directionBuffer[0];
  }
  const interpolatedHead = createVector(Snake[0].x, Snake[0].y);
  interpolatedHead.add(DirectionMap.get(d));

// -----------------------

  line(...[
    Snake[0].x + (interpolatedHead.x-Snake[0].x)*percentage, 
    Snake[0].y + (interpolatedHead.y-Snake[0].y)*percentage, 
    Snake[1].x ,//+ (Snake[0].x-Snake[1].x)*percentage, 
    Snake[1].y ,//+ (Snake[0].y-Snake[1].y)*percentage
  ].map(v=>Offset(v)));
  

  /*
    want to draw the lines such that it's interpolated
    each point should have an 
    offset = (prevPt-currPt) * %ofanimation

    does not have to happen for in between points
  */
  for (let i = 1; i < Snake.length-2; ++i) {
    const ends = [
      Snake[i].x, 
      Snake[i].y, 
      Snake[i+1].x, 
      Snake[i+1].y
    ].map(v => Offset(v));
    
    line(...ends);
  }

  let i = Snake.length-2;
  line(...[
    Snake[i].x + (Snake[i-1].x-Snake[i].x)*percentage, 
    Snake[i].y + (Snake[i-1].y-Snake[i].y)*percentage, 
    Snake[i+1].x + (Snake[i].x-Snake[i+1].x)*percentage, 
    Snake[i+1].y + (Snake[i].y-Snake[i+1].y)*percentage
  ].map(v => Offset(v)));

  strokeWeight(1)

  // testDrawSnake();
}

function isOnSnake(x, y, ignoreHead = false) {
  let i = ignoreHead ? 1 : 0;

  for (; i < Snake.length; ++i) {
    if (Snake[i].x === x && Snake[i].y === y) return true;
  }
  return false;
}
