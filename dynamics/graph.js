class Graph {
  constructor(m) {
    this.x = width-150
    this.y = 120;
    this.rad = 50;
    this.max = m;
    this.pos1 = 50;
    this.pos2 = 0;
    this.vert = [[this.x+this.pos1, this.y-this.pos2]];

  }

  update(v1, v2, m1, m2) {
    this.pos2 = map(sqrt(m1)*v1*100000, -this.max, this.max, -50, 50);
    this.pos1 = map(sqrt(m2)*v2*100000, -this.max, this.max, -50, 50);
    this.vert.push([this.x+this.pos1, this.y-this.pos2]);
  }

  show() {

    noFill();
    stroke(255);
    text('x=sqrt(m1)v1', this.x+60, this.y-10);
    text('y=sqrt(m2)v2', this.x+10, this.y-90);
    line(this.x-100, this.y, this.x+100, this.y);
    line(this.x, this.y-100, this.x, this.y+100);
    stroke(137, 209, 254);
    beginShape();
    for (let i = 0; i < this.vert.length; i++) {
      vertex(this.vert[i][0], this.vert[i][1]);
    }
    endShape();
    stroke(255,0,0);
    ellipse(this.x, this.y, 100, 100);
    stroke(255);
    fill(255);
    ellipse(this.x+this.pos1, this.y-this.pos2, 10, 10);
  }
}
