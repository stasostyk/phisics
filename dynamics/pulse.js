class Pulse {
  constructor(x, mag) {
    this.x = x;
    this.mag = mag;
    this.rad = 0;
  }
  
  update() {
    this.rad+=4;
  }
  
  show() {
    stroke(255,0,0);
    noFill();
    ellipse(this.x, height, this.rad, this.rad);
  }
}