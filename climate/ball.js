class Ball {
  constructor(x, y, clr) {
    this.x = x;
    this.y = y;
    var angle = 0.9+(Math.random()/10);
    this.vx = Math.cos(angle);
    this.vy = Math.sin(angle);

    this.name = clr;
    this.r = Math.floor(Math.random()*150);
    this.g = Math.floor(Math.random()*150);
    this.b = Math.floor(Math.random()*150);
    if (clr == "red")
      this.r = 255;
    else if (clr == "green")
      this.g = 255;
    else
      this.b = 255;
  }

  update(biome) {
    this.x += this.vx*(this.y+50)/170;
    this.y += this.vy*(this.y+50)/170;

    if (this.y >= 445) {
      let probability = 0;
      if (biome == "grass") {
        if (this.name == "green")
          probability = 50;
      } else if (biome == "ocean") {
        if (this.name == "blue")
          probability = 50;
      } else if (biome == "desert") {
        if (this.name == "red" || this.name == "green")
          probability = 50;
      } else if (biome == "snow")
        probability = 70;
      if (Math.floor(Math.random() * 100)+1 <= probability)
      {
        this.vy *= -1;
        return 2;
      }
      else {
        this.y = -10;
        return 1;
      }
    }
    return 0;
  }

  draw() {
    fill(color(this.r, this.g, this.b));
    circle(this.x, this.y, this.y/50);
  }
}
