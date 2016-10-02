'use strict';

let angle = 0;
let slider;
let p;

function setup() {
  createCanvas(800, 600);
  p = createP('not yet set');
  slider = createSlider(0, TWO_PI, PI / 3, 0.01);
}

function draw() {
  background(255);
  angle = slider.value();
  p.html('<strong>current angle</strong>: ' + angle, 10, 40);
  translate(width / 2, height);
  branch(200);
}

function branch(len) {
  stroke(51);
  let w = map(len, 4, 200, 1, 5);
  strokeWeight(w);
  line(0, 0, 0, -len);
  translate(0, -len);
  if(len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }
}
