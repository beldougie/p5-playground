'use strict';
let angle = 0;
let palette = [];
let maxIterations = 50;

function setup() {
  let cnv = createCanvas(500, 300);
  cnv.mouseReleased(draw);
  colorMode(HSB);
  pixelDensity(1);
  loadPixels();
  palette = new PaletteGenerator().generateHSB(256);
  noLoop();
}

function draw() {
  let ca = map(mouseX, 0, width, -1, 1);
  let cb = map(mouseY, 0, height, -1, 1);
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

      pixels[pix + 0] = color.hue;
      pixels[pix + 1] = color.sat;
      pixels[pix + 2] = color.lit;
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}


function pickColor(idx) {
  if(idx === maxIterations) {
    return { hue: 0, sat: 0, lit: 0 };
  } else {
    let truI = floor((idx / (maxIterations - 1)) * 255);
    if(truI > palette.length) {
      truI = palette.length - 1;
    }
    return palette[truI];
  }
}
