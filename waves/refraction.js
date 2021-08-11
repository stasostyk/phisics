var ind = {
  "air" : [1, 225,245,255],
  "water" : [1.33, 160, 212, 255],
  "alcohol" : [1.36, 255, 223, 166],
  "glass" : [1.5, 255, 255, 255],
  "ruby" : [1.76, 255, 166, 166],
  "diamond" : [2.42, 160, 252, 255],
};

var upperSel;
var lowerSel;
var pseudo;
let angle;

var upper = "air";
var lower = "diamond";

var len_laser = 200;

function setup() {
  cnv = createCanvas(500, 500);
  cnv.parent('cnv');

  angleMode(DEGREES);

  upperSel = createSelect();
  upperSel.position(cnv.position().x + 400, cnv.position().y + 435);
  lowerSel = createSelect();
  lowerSel.position(cnv.position().x + 400, cnv.position().y + 465);

//   isn't 'i in ind' beautiful?
  for (var i in ind) {
    upperSel.option(i);
    lowerSel.option(i);
  }
  lowerSel.selected(lower);

  upperSel.changed(upperChange);
  lowerSel.changed(lowerChange);

  pseudo = createCheckbox('', true);
  pseudo.position(cnv.position().x+ 400, cnv.position().y +410);

  angle = createSlider(1, 90, 45);
  angle.position(cnv.position().x+ 400, cnv.position().y+370);
  angle.style('width', '70px')
}

// change medium
function upperChange() {
  upper = upperSel.value();
}

function lowerChange() {
  lower = lowerSel.value();
}

function draw() {
  var ang = angle.value();
  var new_ang = (sin(90-ang)*ind[upper][0])/ind[lower][0];
  if (new_ang > 1)
    new_ang = ang+90;
  else
    new_ang = asin(new_ang);

  background(220);


  // line(0, 250, 500, 250);
  noStroke();

  fill(ind[upper][1], ind[upper][2], ind[upper][3]);
  rect(0,0, 500, 250);

  fill(ind[lower][1], ind[lower][2], ind[lower][3]);
  rect(0,250, 500, 250);

  if (pseudo.checked()) {
    push();
    stroke(0,0,0);
    strokeWeight(2);

    line(250, 0, 250, 500);
    line(0,250,500,250);

    noFill();
    arc(250, 250, 100, 100, 90, 90+new_ang);
    arc(250, 250, 100, 100, 360-ang, 360);

    pop();
  }

//   drawing laser
  push();
  stroke(255,50,50);
  strokeWeight(7);

  var x = len_laser*cos(ang);
  var y = len_laser*sin(ang);

  line(250, 250, 250+x, 250-y);

  // strokeWeight(3);
  // line(250, 250, 250-x, 250-y);

  x = len_laser*sin(new_ang);
  y = len_laser*cos(new_ang);

  var base = createVector(250,250);
  var vec = createVector(-x, y);
  drawArrow(base, vec, 'red');
  // line(250, 250, 250-x, 250+y);

  pop();

  push();
  stroke(0);
  fill(0);
  strokeWeight(0.5);

  text("θ = " + ang + "°", 250+(200*cos(ang/2))/3,250-(200*sin(ang/2))/3);
  text("α = " + round(new_ang) + "°", 250-(500*sin(new_ang-3))/3,250+(500*cos(new_ang-3))/3);
  text("μ  = " + ind[upper][0], 340, 450);
  text("μ  = " + ind[lower][0], 340, 480);
  text("incident angle", 310, 387);
  text("diagram", 420, 427);

  if (ind[lower] < ind[upper])
    text("crit. angle = " + (90-round(asin(ind[lower][0]/ind[upper][0]))) + "°", 400, 360);

  textSize(10);
  text("1", 346, 455);
  text("2", 346, 485);
  text("1°               90°", 400,400);


  pop();
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
