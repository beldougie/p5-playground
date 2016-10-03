class Mandlebrot {
  constructor(pixels, width, height) {
    this.pxArr = pixels;
    this.w = width;
    this.h = height;
    this.minX0 = -2.5;
    this.maxX0 = 1;
    this.minY0 = -1;
    this.maxY0 = 1;
  }

  init(maxIterations) {
    this.maxIterations = maxIterations || 100;
    this.palette = new PaletteGenerator().generate();
  }

  setPixel(pixIdx, rVal, gVal, bVal, aVal) {
    this.pxArr[pixIdx + 0] = rVal;
    this.pxArr[pixIdx + 1] = gVal;
    this.pxArr[pixIdx + 2] = bVal;
    this.pxArr[pixIdx + 3] = aVal;
  }

  show(minX, maxX, minY, maxY) {
    this.minX0 = minX;
    this.minY0 = minY;
    this.maxX0 = maxX
    this.maxY0 = maxY;

    for(let x = 0; x < this.w; x++) {
      for(let y = 0; y < this.h; y++) {
        let idx = (x + y * this.w) * 4;
        let color = this.pickColor(x, y);
        this.setPixel(idx, color.r, color.g, color.b, 255);
      }
    }
  }

  iterate(x, y) {

    let x0 = map(x, 0, this.w, this.minX0, this.maxX0);
    let y0 = map(y, 0, this.h, this.minY0, this.maxY0);

    let a = 0;
    let b = 0;
    let n = 0; // iterations
    let z = 0; //
    let aa = 0; // a squared
    let bb = 0; // 2ab

    for(; n < this.maxIterations && abs(aa + bb) < 200; n++) {
      aa = a * a - b * b + x0;
      bb = 2 * a * b + y0;

      a = aa;
      b = bb;
    }

    return n;
  }

  pickColor(x, y) {
    let idx = this.iterate(x, y);
    if(idx === this.maxIterations) {
      return { r: 0, g: 0, b: 0 };
    } else {
      return this.palette[floor((idx / (this.maxIterations - 1)) * 255)];
    }
  }


}
