class Ball {
  constructor(x, y) {
    this.x=x;
    this.y=y;

    this.v = 0;
  }

  draw() {
    circle(this.x, this.y, 10);
  }
}
