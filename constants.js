const BlockWidth = 20;
const BoardHeight = 20;
const BoardWidth = 20;

const Offset = i => BlockWidth*i+BlockWidth/2;

// list of p5.Vector class (x, y)
const Snake = [];

const DirectionMap = new Map([
    ["w", [0, -1]],
    ["a", [-1, 0]],
    ["s", [0, 1]],
    ["d", [1, 0]]
]); 

const FPS = 30;

/* 
  want 6 blocks/sec 
  1 block / <SnakeFPS> frames * <FPS> frames/sec 
*/
const SnakeFPS = FPS / 6; 

const Collision = {
  None: 0,
  Kill: 1,
  Apple: 2
};

const KeyMappings = new Map([
  [87, "w"],
  [65, "a"],
  [83, "s"],
  [68, "d"]
]);
const OppositeDirection = new Map([
  ["s", "w"],
  ["d", "a"],
  ["w", "s"],
  ["a", "d"]
]);
