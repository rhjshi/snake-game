const Apple = {
  x: BoardWidth / 2, 
  y: BoardHeight / 2
};

function drawApple() {
  fill("#ff0800");
  circle(Offset(Apple.x), Offset(Apple.y), BlockWidth*3/4);
}

