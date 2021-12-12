g = 0.5;
m1 = 10;
m2 = 20;
v = 0;
x = 0;

let m1s;
let m2s;

function setup() {
  cnvs = createCanvas(400, 600);
  cnvs.parent('cnvs');
  m1s = createSlider(1, 5, 2.5, 0.1);
  m2s = createSlider(1, 5, 2.5, 0.1);

  m1s.position(cnvs.position().x+10, cnvs.position().y+10);
  m2s.position(cnvs.position().x+10, cnvs.position().y+70);

  m1s.style('width', '80px');
  m2s.style('width', '80px');

  textSize(15);
}

function draw() {
  m1 = m1s.value();
  m2 = m2s.value();


  if (Number(theme) >= 0 && Number(theme) <= 3)
    background("#99aab5 ");
  else
    background(255);

  v += getAccel();

  if (abs(x) > 230) {
    v = 0;
    if (x > 0)
      x = 230;
    else
      x = -230;
  }

  x += v;

  fill(200);
  strokeWeight(5);
  ellipse(200,50, 150, 50);

  fill(0);

  text("m = " + m1 + " kg", 15, 50);
  text("M = " + m2 + " kg", 15, 110);


  push();
  translate(115, 300+x);
  rotate(-PI/2);
  var KE = round(0.5*m1*v*v);
  var PE = round(m1*g*(230-x));
  if (abs(x) >= 230) {
    KE = 0;
  }
  if (x >= 230)
    PE = 0;
  stroke(0);
  strokeWeight(1);
  text("KE = " + KE + " J", -65, 50+m1*2.5);
  text("PE = " + PE + " J", -70, 80+m1*2.5);
  pop();

  line(125, 50, 125, x+320);
  line(275, 50, 275, 320-x);

  strokeWeight(1);

  fill(50);
  rect(100-(m1*5)/2, 320+x, 50+m1*5);
  rect(250-(m2*5)/2, 320-x, 50+m2*5);

  push();
  fill(255);
  text("m", 120, 350+x);
  text("M", 270, 350-x);
  pop();
}

function getAccel() {
  return (m1 * g - m2 * g) / (m1 + m2);
}
