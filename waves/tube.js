let g = 0.1;
let l = 50;
let x = 0;
let v = 0;
let initialX = 0;

let pos = [];
let vel = [];
let accel = [];

let disp;
let grav;

function setup() {
  cnvs = createCanvas(800, 400);
  cnvs.parent('cnvs');

  disp = createSlider(0,50,30,1);
  disp.position(cnvs.position().x+10,cnvs.position().y+10);
  disp.style('width','80px');

  grav = createSlider(0,0.5,0.1,0.01);
  grav.position(cnvs.position().x+10,cnvs.position().y+30);
  grav.style('width','80px');

  initialX = 30;
  x=initialX;
}

function draw() {
  if (Number(theme) >= 0 && Number(theme) <= 3)
    background("#99aab5 ");
  else
    background(255);
  if (grav.value() != g) {
    g = grav.value();
    x = initialX;
    v = 0;
  }

  if (disp.value() != initialX) {
    x = disp.value();
    initialX = disp.value();
    print(disp.value());
    v=0;
  }

  v += getAccel(x);
  x+=v;

  pos.push(x);
  vel.push(v*10);
  accel.push(getAccel(x)*100);

  if (pos.length >= 100)
    pos.shift();
  if (vel.length >= 100)
    vel.shift();
  if (accel.length >= 100)
    accel.shift();

  noFill();
  stroke(255,0,0);
  line(600,50,600,350);
  line(600,100,700,100);
  line(600,200,700,200);
  line(600,300,700,300);
  stroke(0);
  beginShape();
  for (let i = 0; i < pos.length; i++)
    vertex(600+i, 100-pos[i]);
  endShape();
  beginShape();
  for (let i = 0; i < vel.length; i++)
    vertex(600+i, 200-vel[i]);
  endShape();
  beginShape();
  for (let i = 0; i < accel.length; i++)
    vertex(600+i, 300-accel[i]);
  endShape();


  noStroke();
  fill(0);

  circle(200,203,220);
  circle(200,200,100);
  fill(0,0,255);
  circle(200,200,200);

  fill(0);
  circle(200,200,100);
  fill("#99aab5 ");
  rect(0,0,300,height/2);
  fill("#99aab5 ");
  circle(200,200,80);
  fill(0);
  rect(90,100,70,100);
  rect(240,100,70,100);
  fill("#99aab5 ");
  rect(100,100,50,100);
  rect(250,100,50,100);
  fill(0,0,255);
  rect(100,200,50,-x-50);
  rect(250,200,50,x-50);

  stroke(0);
  fill(0);
  strokeWeight(5);
  line(400,100, 400, 190);
  line(400,210, 400, 300);
  triangle(395,100,405,100,400,95);
  triangle(395,300,405,300,400,305);
  strokeWeight(1);
  text("Fl = "+Math.round(getAccel(x)*-100)+" N", 415,100);
  text("Fr = "+Math.round(getAccel(x)*100)+" N", 415, 300);
  text("x", 580, 100);
  text("v", 580, 200);
  text("a", 580, 300);
  text("initial displacement", 100, 25);
  text("gravity", 100, 45);
}

function getAccel(d) {
  return -2*g*d/l;
}
