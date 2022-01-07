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
// euler integration with timestep dt=1000
    for (let i = 0; i < 1000; i++) {
      // bounce detection
      let collided_x = false;
      let collided_y = false;
      if (this.x-5 <= 0 || this.x+5 >= width) {
        this.vx *= -1;
        collided_x = true;
      }
      if (this.y+5 >= 400 || this.y-5 <= 0) {
        this.vy *= -1;
        collided_y = true;

        // rolling friction
        if (this.vy < 1 && this.vy > -1)
          this.vx*=0.99999;
      }

      // update rates of change
      this.x+=this.vx/1000;
      this.vy += this.g/1000;
      this.y+=this.vy/1000;

      // account for loss in energy
      if (collided_x)
        this.vx *= 0.7;

      if (collided_y)
        this.vy *= 0.7;
    }
  }
}
