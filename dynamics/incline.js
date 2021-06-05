let Fa = 0;
let g = 0.5;
let muK = 0.2;
let muS = muK*2;
let mass;
let angle;
let coef;

let x = 300;
let v = 0;

let ang = 0;
let m = 10;

let w = m*5;

function setup() {
  cnvs = createCanvas(800, 500);
  cnvs.parent('cnvs');

  rectMode(CENTER);

  angle = createSlider(-20.0, -4.0, -6.5, 0.1);
  angle.position(cnvs.position().x+10,cnvs.position().y+10);
  angle.style('width', '80px');

  mass = createSlider(5,20,10, 1);
  mass.position(cnvs.position().x+10,cnvs.position().y+40);
  mass.style('width', '80px');

  coef = createSlider(1,4,2,0.1);
  coef.position(cnvs.position().x+10,cnvs.position().y+70);
  coef.style('width', '80px');
}

function draw() {
  ang = -PI/angle.value();
  m = mass.value();

  let fric = getFf();

  if (Number(theme) >= 0 && Number(theme) <= 3)
    background("#99aab5 ");
  else
    background(255);

  w = m*5;
  muK = round(coef.value())/10;
  muS = muK*2;

  fill(200);
  triangle(0, height-width*tan(ang), 0,height, width, height);


  fill(100);

  push();
  translate(x, height-tan(ang)*(width-x));
  rotate(ang);
  rect(0,-w/2,w,w);

  fill(0);
  text("Fgy", 0, m*g*cos(ang)*10-10);
  text("Ff", fric*-30-20, -10);
  text("Fn", 5, m*g*cos(ang)*-10-20);
  text("Fa + Fgx", m*g*sin(ang)*20, -10);

  var base = createVector(0, -w/2);
  drawArrow(base, createVector(0, m*g*cos(ang)*10), 'black');
  drawArrow(base, createVector(fric*-30, 0), 'black');
  drawArrow(base, createVector(0, m*g*cos(ang)*-10), 'black');
  drawArrow(base, createVector(m*g*sin(ang)*20, 0), 'black');
  pop();

//   Arrows
  push();
  textSize(18);
  fill(0);
  text("Angle: " + round(ang*(180/PI)*100)/100 + "°",110,25);
  text("Mass: " + m + " kg",110,55);
  text("µ kinetic: " + muK + ", µ static: " + muS,110,85);
  pop();
  let acc = getAccel();
  v+=acc;
  if (acc === 0)
    v = 0;

  x+=v/20;

  if (x >= width) {
    x = 0;
    if (v >= 100)
      v = 0;
  }
}

function getAccel() {
  return (Fa - getFf() + m*g*sin(ang))/m;
}

function getFf() {
  if (abs(Fa + m*g*sin(ang)) <= m*g*cos(ang)*muS) {
    return m*g*sin(ang) + Fa;
  }
  return m*g*cos(ang)*muK + Fa;
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  if (Number(theme) >= 0 && Number(theme) <= 3) {
    stroke(colors[Number(theme)]);
    fill(colors[Number(theme)]);
  }
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
