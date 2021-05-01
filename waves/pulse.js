class Pulse {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.pts = [];
    for (let i = 0; i < width; i++) {
      this.pts.push(0);
    }
    // print(this.pts);
  }

  intersects(mx, my) {
    return mx > this.x && mx < this.x+this.w && my > this.y && my < this.y+this.h;
  }

  draw() {
    stroke(100);
    fill(100);
    rect(this.x, this.y, this.w, this.h);
  }

  move(other) {
    // print(this.pts);
    other.pts[100] -= this.pts[this.pts.length-1];
    for (let i = this.pts.length; i >= 2; i--) {
      this.pts[i-1] = this.pts[i-2];
      this.pts[0] = 0;
    }
  }

  pulse(amp, wl) {
    for (let i = 100-wl; i < 100; i++) {
      let ind = i - 100 + wl;
      this.pts[i] -= amp*sin(ind*PI/wl);
    }
  }
}
