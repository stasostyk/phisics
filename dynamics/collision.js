let block1;
let block2;
const timeSteps = 1000;

let v1 = 2/timeSteps;
let v2 = -2/timeSteps;
let m1 = 5;
let m2 = 5;

let v1slider;
let v2slider;
let m1slider;
let m2slider;

let sel;
let type = "perfectly elastic";

let vel1 = [];
let vel2 = [];

function setup() {
  cnvs = createCanvas(800, 400);
  cnvs.parent('cnvs');
  sel = createSelect();
  sel.position(cnvs.position().x+120, cnvs.position().y+150);
  sel.option('perfectly elastic');
  sel.option('perfectly inelastic');
  sel.changed(changeType);

  block1 = new Block(200, 100, 5, 2/timeSteps, 0, 0,255,255);
  block2 = new Block(500, 100, 5, -2/timeSteps, 0, 255,215,0);

  v1slider = createSlider(-10, 10, 2, 1);
  v1slider.position(cnvs.position().x+10, cnvs.position().y+10);
  v1slider.style('width', '80px');

  v2slider = createSlider(-10, 10, -2, 1);
  v2slider.position(cnvs.position().x+10, cnvs.position().y+40);
  v2slider.style('width', '80px');

  m1slider = createSlider(1, 10, 5);
  m1slider.position(cnvs.position().x+10, cnvs.position().y+70);
  m1slider.style('width', '80px');

  m2slider = createSlider(1, 10, 5);
  m2slider.position(cnvs.position().x+10, cnvs.position().y+100);
  m2slider.style('width', '80px');
}

function draw() {
  background(255);
  noStroke();
  fill(0);
  textSize(12);
  text("Initial V  = " + v1slider.value(), 100, 25);
  text("Initial V  = " + v2slider.value(), 100, 55);
  text("Mass  = " + m1slider.value(), 100, 85);
  text("Mass  = " + m2slider.value(), 100, 115);

  text("Type of collision: ", 15, 170);

  text("V  = " + block1.v*1000 + " m/s", 450, 75)
  text("V  = " + block2.v*1000 + " m/s", 450, 105)

  textSize(10);
  text("1", 139, 29);
  text("2", 139, 59);

  text("1", 129, 89);
  text("2", 129, 119);

  text("1", 456, 79);
  text("2", 457, 109);

  text("-10m/s", 5, 37);
  text("10m/s", 63, 37);

  text("-10m/s", 5, 67);
  text("10m/s", 63, 67);

  text("1kg", 5, 97);
  text("10kg", 63, 97);

  text("1kg", 5, 127);
  text("10kg", 63, 127);

  for (let i = 0; i < timeSteps; i++) {

    if (block1.collide(block2)) {
      if (type == "perfectly elastic") {
        const v1 = block1.bounce(block2);
        const v2 = block2.bounce(block1);
        block1.v = v1;
        block2.v = v2;
      } else if (type=="perfectly inelastic"){
        var vf = (block1.m*block1.v + block2.m*block2.v)/(block1.m+block2.m);
        block1.v = vf;
        block2.v = vf;
        // block2.x = block1.x+block1.w;
      }

    }
    if (block1.hitWall()) {
      if (type=="perfectly inelastic" && block1.v === block2.v && block1.collide(block2)) {
        block2.reverse();
      }
      block1.reverse();
    }
    if (block2.hitWall()) {
      if (type=="perfectly inelastic" && block1.v === block2.v && block1.collide(block2)) {
        block1.reverse();
      }
      block2.reverse();
    }

    block1.update();
    block2.update();
  }

  block1.show();
  block2.show();

    if (v1 != v1slider.value()/timeSteps) {
    block1.v = v1slider.value()/timeSteps;
    v1 = v1slider.value()/timeSteps;
  }
  if (v2 != v2slider.value()/timeSteps) {
    block2.v = v2slider.value()/timeSteps;
    v2 = v2slider.value()/timeSteps;
  }
  if (m1 != m1slider.value()) {
    block1.m = m1slider.value();
    m1 = m1slider.value();
  }
  if (m2 != m2slider.value()) {
    block2.m = m2slider.value();
    m2 = m2slider.value();
  }

  noFill();
  strokeWeight(3);
  stroke(0);
  line(295, 50, 295, 150);
  line(295, 100, 405, 100);
  strokeWeight(1);
  text("t", 415, 100);
  text("v", 300, 50);
  strokeWeight(5);
  stroke(0,255,255);
  beginShape();
  for (let i = 0; i < vel1.length; i++)
    vertex(300+i*2, 100-vel1[i]*timeSteps*8);
  endShape();
  stroke(255,215,0);
  beginShape();
  for (let i = 0; i < vel2.length; i++)
    vertex(300+i*2, 100-vel2[i]*timeSteps*8);
  endShape();
  strokeWeight(1);

  vel1.push(block1.v);
  vel2.push(block2.v);

  if (vel1.length > 50) {
      vel1.shift();
  }
  if (vel2.length > 50) {
      vel2.shift();
  }
}

function changeType() {
  type = sel.value();
  block1.x -= 1;
  block2.x += 1;
}
