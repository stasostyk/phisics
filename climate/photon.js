class Photon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    var angle = 1.2+(Math.random()/10);
    this.vx = Math.cos(angle);
    this.vy = Math.sin(angle);

    this.name = "solar";
    this.timer = 0;

    this.is_leaving = false;
  }

  update(probability) {
    if (this.is_leaving) {
      this.is_leaving = false;
      return 3;
    }

    if (this.timer > 0) {
      if (this.timer == 1)
        this.is_leaving = true;
      this.timer--;
      return 0;
    }

    this.x += this.vx*(this.y+50)/170;
    this.y += this.vy*(this.y+50)/170;

    if (this.y >= 445 && this.name == "solar") {
      if (Math.floor(Math.random() * 100)+1 < probability)
      {
        this.vy *= -1;
        return 2;
      }
      else {
        this.name = "infrared";
      }
    }
    if (this.y >= 445 && this.name == "infrared" && this.vy > 0) {
      this.timer = 50;
      this.x = width/2;
      this.y = 500;

      let ang = 3*PI/8 + Math.random()*PI/4;
      let magnitude = sqrt(this.vx*this.vx + this.vy*this.vy);
      this.vx = magnitude*cos(ang);
      this.vy = -magnitude*sin(ang);

      return 1;
    }
    return 0;
  }

  draw() {
    if (this.name == "solar")
      fill(color(255,211,0));
    else if (this.name == "infrared")
      fill(color(255,0,0));

    circle(this.x, this.y, this.y/50);
  }
}
