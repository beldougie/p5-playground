'use strict';
let mb;
let minXSlider, maxXSlider, minYSlider, maxYSlider;

function setup() {
  createCanvas(300, 300);
  pixelDensity(1);
  loadPixels();
  mb = new Mandlebrot(pixels, width, height);
  mb.init();
  createP('Zoom X');
  minXSlider = createSlider(-2.5, 0, -2.5, 0.01)
  maxXSlider = createSlider(0, 1, 1, 0.01);
  createP('Zoom Y');
  minYSlider = createSlider(-1, 0, -1, 0.01);
  maxYSlider = createSlider(0, 1, 1, 0.01);
}

function draw() {
  mb.show(minXSlider.value(), maxXSlider.value(), minYSlider.value(), maxYSlider.value());
  updatePixels();
}
