'use strict';
let angle = 0;
let palette = [];
let maxIterations = 50;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  loadPixels();

  palette = new PaletteGenerator().generate([24, 16, 12, 255], [5, 3, 2, -5]);
}

function draw() {
  let ca = sin(angle * HALF_PI);
  let cb = sin(map(angle, 0, 360, -20, 20));
  angle += 0.1;

  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      let a = map(x, 0, width, -2, 2);
      let b = map(y, 0, height, -2, 2);
      let n = 0; // iterations
      let z = 0; //
      let aa = 0;
      let bb = 0;

      for(; n < maxIterations && abs(aa + bb) < 4; n++) {
        aa = a * a;
        bb = b * b;
        let twoab = 2 * a * b;
        a = aa - bb + ca;
        b = twoab + cb;
      }
      let color = pickColor(n);
      let pix = (x + y * width) * 4;

      pixels[pix + 0] = color.r;
      pixels[pix + 1] = color.g;
      pixels[pix + 2] = color.b;
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}


function pickColor(idx) {
  if(idx === maxIterations) {
    return { r: 0, g: 0, b: 0 };
  } else {
    return palette[floor((idx / (maxIterations - 1)) * 255)];
  }
}
