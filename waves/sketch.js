let lp;
let rp;

let leftAmp;
let rightAmp;

let leftWl;
let rightWl;

let clearB;

function setup() {
  cnv=createCanvas(800, 500);
  cnv.parent('cnv');
  cnv.mouseClicked(sendPulse);

  lp = new Pulse(0,height/2-50, 50,100);
  rp = new Pulse(width-50,height/2-50, 50,100);

  leftAmp = createSlider(-50, 50, 30);
  leftAmp.position(cnv.position().x+110, cnv.position().y+35);
  leftAmp.style('width', '80px');

  rightAmp = createSlider(-50, 50, -30);
  rightAmp.position(cnv.position().x+110, cnv.position().y+65);
  rightAmp.style('width', '80px');

  leftWl = createSlider(1, 100, 50);
  leftWl.position(cnv.position().x+680, cnv.position().y+35);
  leftWl.style('width', '80px');

  rightWl = createSlider(1, 100, 50);
  rightWl.position(cnv.position().x+680, cnv.position().y+65);
  rightWl.style('width', '80px');
}

function draw() {
  strokeWeight(0.7);
  if (Number(theme) >= 0 && Number(theme) <= 3)
    background("#99aab5 ");
  else
    background(255);

  fill(0);

  text('Left Pulse Generator', 90, 20);
  text('Amplitude',10, 50);
  text('Wavelength (λ)', 10, 80);


  text('Right Pulse Generator', 660, 20)
  text('Amplitude',580, 50);
  text('Wavelength (λ)', 580, 80);

  text('Pseudo-Diagram:', 15, 350);

  push();
  textSize(10);
  strokeWeight(0.5);
  text("-50 px             50 px",110,62);
  text("1 px             100 px",110,92);
  text("-50 px             50 px",680,62);
  text("1 px             100 px",680,92);
  pop();


  clearB = createButton("Reset Simulation");
  clearB.position(cnv.position().x+10, cnv.position().y+height-40);
  clearB.mousePressed(reset);

  lp.move(rp);
  rp.move(lp);

  lp.draw();
  rp.draw();


  noFill();

  stroke(255,0,0);
  beginShape();
  for (let i = 101; i < lp.pts.length; i++) {
    vertex(50+i-100, 400+lp.pts[i]);
  }
  endShape();

  stroke(0,0,255);
  beginShape();
  for (let i = 101; i < lp.pts.length; i++) {
    vertex(50+i-100, 400+rp.pts[rp.pts.length-i+101]);
  }
  endShape();

  strokeWeight(5);
  stroke(0,0,0);
  beginShape();
  for (let i = 101; i < lp.pts.length; i++) {
    vertex(50+i-100, height/2+lp.pts[i]+rp.pts[rp.pts.length-i+101]);
  }
  endShape();
  strokeWeight(1);


  push();
  rotate(-PI/2);
  strokeWeight(0.5);
  fill(0);
  text("Click me!", -280, 30);
  text("Click me!", -280, 780);
  pop();

  fill(255);

}

function sendPulse() {
  if (lp.intersects(mouseX, mouseY)) {
   lp.pulse(leftAmp.value(), leftWl.value());
  }

  if (rp.intersects(mouseX, mouseY)) {
   rp.pulse(rightAmp.value(),rightWl.value());
  }
}

function reset() {
  lp = new Pulse(0,height/2-50, 50,100);
  rp = new Pulse(width-50,height/2-50, 50,100);
}
