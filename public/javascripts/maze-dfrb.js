const grid = [];
const stack = [];
let cols, rows;
let scale = 15;
let current;

function setup() {
  createCanvas(600, 600);
  cols = floor(width / scale);
  rows = floor(height / scale);

  for(let j = 0; j < rows; j++) {
    for(let i = 0; i < cols; i++) {
      grid.push(new Cell(i, j));
    }
  }

  current = grid[0];
  // frameRate(10);
}

function draw() {
  background(150);
  stroke(51);
  grid.forEach(cell => cell.render());
  current.visited = true;
  current.highlight();

  // STEP 1
  let next = current.checkNeighbours();
  if(next) {
    // STEP 2
    stack.push(current);
    // STEP 3
    removeWalls(current, next);
    // STEP 4
    current = next;
  } else if(stack.length) {
    current = stack.pop();
  }

}

function removeWalls(cell, neighbour) {
  let x = cell.i - neighbour.i;
  if(x === 1) {
    cell.walls[3] = false;
    neighbour.walls[1] = false;
  } else if(x === -1) {
    cell.walls[1] = false
    neighbour.walls[3] = false
  }
  let y = cell.j - neighbour.j;
  if(y === 1) {
    cell.walls[0] = false;
    neighbour.walls[2] = false;
  } else if(y === -1) {
    cell.walls[2] = false;
    neighbour.walls[0] = false;
  }
}

function index(i, j) {
  if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }

  return i + j * cols;
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.visited = false;
    this.walls = [true, true, true, true];
  }

  render() {
    let x = this.i * scale;
    let y = this.j * scale;
    stroke(51);
    if(this.walls[0]) {
      line(x, y, x + scale, y);
    }
    if(this.walls[1]) {
      line(x + scale, y, x + scale, y + scale);
    }
    if(this.walls[2]) {
      line(x + scale, y + scale, x, y + scale);
    }
    if(this.walls[3]) {
      line(x, y + scale, x, y);
    }

    if(this.visited) {
      noStroke();
      fill(255, 0, 0, 100);
      rect(x, y, scale, scale);
    }
  }

  checkNeighbours() {
    let neighbours = [];

    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j)];

    if(top && !top.visited) {
      neighbours.push(top);
    }
    if(right && !right.visited) {
      neighbours.push(right);
    }
    if(bottom && !bottom.visited) {
      neighbours.push(bottom)
    }
    if(left && !left.visited) {
      neighbours.push(left);
    }

    if(neighbours.length) {
      let _i = floor(random(0, neighbours.length));
      return neighbours[_i];
    } else {
      return undefined;
    }
  }

  highlight() {
    let x = this.i * scale;
    let y = this.j * scale;
    noStroke();
    fill(0, 255, 0);
    rect(x, y, scale, scale);
  }

}
