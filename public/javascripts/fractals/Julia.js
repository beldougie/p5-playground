class Julia {
  constructor(pixels, width, height) {
    this.pxArr = pixels;
    this.w = width;
    this.h = height;
  }

  init(maxIterations) {
    this.maxIterations = maxIterations || 30;
    this.palette = new PaletteGenerator([24, 16, 12, 255], [5, 3, 2, -5]).generate();
  }

  setPixel(pixIdx, rVal, gVal, bVal, aVal) {
    this.pxArr[pixIdx + 0] = rVal;
    this.pxArr[pixIdx + 1] = gVal;
    this.pxArr[pixIdx + 2] = bVal;
    this.pxArr[pixIdx + 3] = aVal;
  }

  show(ca, cb) {

    for(let x = 0; x < this.w; x++) {
      for(let y = 0; y < this.h; y++) {
        let idx = (x + y * this.w) * 4;
        let color = this.pickColor(x, y);
        this.setPixel(idx, color.r, color.g, color.b, 255);
      }
    }
  }

  iterate(x, y) {

    let a = map(x, 0, this.w, -2, 2);
    let b = map(y, 0, this.w, -2, 2);
    let n = 0; // iterations
    let z = 0; //
    let aa = a * a;
    let bb = b * b;

    for(; n < this.maxIterations && abs(aa + bb) < 4; n++) {
      aa = a * a;
      bb = b * b;
      let twoab = 2 * a * b;
      a = aa - bb + this.ca;
      b = twoab + this.cb;
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
