class Block {
  constructor(x, w, m, v, xC) {
    this.x = x;
    this.y = height - w;
    this.w = w;
    this.v = v;
    this.m = m;
    this.xConstraint = xC;
  }
  
  hitWall() {
    return this.x <= 0;
  }
  
  reverse() {
    this.v *= -1;
  }
  
  collide(other) {
    return !(this.x + this.w < other.x || this.x > other.x + other.w);
  }
  
  bounce(other) {
    let sumM = this.m + other.m;
    let newV = (this.m-other.m)/sumM * this.v;
    newV += 2 * other.m / sumM * other.v;
    return newV;
  }
  
  update() {
    this.x+= this.v;
  }
  
  show() {
    stroke(0);
    fill(255);
    const x = constrain(this.x, this.xConstraint, width)
    rect(x, this.y, this.w, this.w);
  }
}