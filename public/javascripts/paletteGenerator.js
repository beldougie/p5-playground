class PaletteGenerator {
  constructor(roots, modifiers) {
    if(roots === undefined) {
      roots = [24, 16, 0, 255];
    }
    if(modifiers === undefined) {
      modifiers = [3, 3, 3, -3];
    }
    this.palette = [];
    this.roots = roots;
    this.mods = modifiers;
    console.log(this.roots, this.mods);
  }

  generateHSB(num_colors) {

    for(let i = 0; i < 360; i += 360 / num_colors) {
      let color = {
        hue: i,
        sat: 90 + floor(random() * 10),
        lit: 50 + floor(random() * 10)
      };
      this.palette.push(color);
    }
    return this.palette;
  }

  generateRGB() {


    let rOffset = this.roots[0];
    let gOffset = this.roots[1];
    let bOffset = this.roots[2];
    let aOffset = this.roots[3];

    for(let i = 0; i < 256; i++) {
      this.palette[i] = { r: rOffset, g: gOffset, b: bOffset, a: aOffset };
      if(i < 64) {
        rOffset += this.mods[0];
      } else if(i < 128) {
        gOffset += this.mods[1];
      } else if(i < 192) {
        bOffset += this.mods[2];
      } else {
        aOffset += this.mods[3];
      }
    }
    return this.palette
  }
}
