class Ball {
  constructor(x, y, vx, vy, g) {
    this.x=x;
    this.y=y;
    this.vy=vy;
    this.vx=vx;
    this.g = g;
  }

  draw() {
    circle(this.x, this.y, 10);
  }

  update() {
    this.x+=this.vx;
    this.y+=this.vy;

    this.vy += this.g;

    if (this.x-5 <= 0 || this.x+5 >= width) {
      this.vx *= -1;
    }
    if (this.y-5 <= 0) {
      this.vy *= -1;
    }

    if (this.y+5 >= 400) {
      this.y = 400-5;
      this.vy *= -0.7;

      if (this.vy < 0 && this.vy > -this.g*5) {
        this.vy = 0;
        this.vx = 0;
      }
    }
  }
}
