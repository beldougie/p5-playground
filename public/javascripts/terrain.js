'use strict';

class TerrainCanvas {

  constructor(scale, width, height) {
    this.scale = scale;
    this.width = width;
    this.height = height;
    this.cols = this.width / scale;
    this.rows = this.height / scale;
    this.terrain = [];
    this.flying = 0;
    for(let x = 0; x < this.cols; x++) {
      this.terrain[x] = [];
    }
  }

  show() {

    this.flying -= 0.007;
    let yoff = this.flying;

    for(let y = 0; y < this.rows; y++) {
      let xoff = 0;
      for(let x = 0; x < this.cols; x++) {
        this.terrain[x][y] = map(noise(xoff, yoff), 0, 1, 100, -100);
        xoff += 0.2;
      }
      yoff += 0.2;
    }

    background(0);
    translate(0, 50);
    rotateX(-PI / 3);
    translate(-this.width / 2, -height);
    strokeWeight(2);
    stroke('red');
    for(let y = 0; y < this.rows - 1; y++) {
      // beginShape(TRIANGLE_STRIP);
      for(let x = 0; x < this.cols; x++) {
        push();
        translate(x * this.scale, y * this.scale, this.terrain[x][y]);
        let shapeSize = this.scale;
        box(shapeSize);
        pop();
      }
      // endShape();
    }
  }
}

let terrain;

function setup() {
  createCanvas(600, 600, WEBGL);
  terrain = new TerrainCanvas(20, 1400, 1000);
  pointLight(255, 255, 255, -1, 1);
  normalMaterial();
  // ambientMaterial(220, 244, 66);
}

function draw() {
  stroke(255);

  // pointLight(255, 255, 255, 1, -0.5);

  terrain.show();
}
