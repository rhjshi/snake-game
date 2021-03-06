const Apple = {
  x: BoardWidth / 2, 
  y: BoardHeight / 2
};

function drawApple() {
  fill("#ff0800");
  circle(Offset(Apple.x), Offset(Apple.y), BlockWidth*3/4);
}

function moveApple() {
  let x, y;
  do {
    x = Math.floor(Math.random() * BoardWidth);
    y = Math.floor(Math.random() * BoardHeight);
  } while ( isOnSnake(x, y) );

  Apple.x = x;
  Apple.y = y;
}