let lp;
let rp;

let leftAmp;
let rightAmp;

let leftWl;
let rightWl;

function setup() {
  cnv=createCanvas(800, 500);
  cnv.parent('cnv');
  cnv.mouseClicked(sendPulse);

  lp = new Pulse(0,height/2-50, 50,100);
  rp = new Pulse(width-50,height/2-50, 50,100);

  leftAmp = createSlider(-50, 50, 30);
  leftAmp.position(cnv.position().x+45, cnv.position().y+10);
  leftAmp.style('width', '80px');

  rightAmp = createSlider(-50, 50, -30);
  rightAmp.position(cnv.position().x+45, cnv.position().y+40);
  rightAmp.style('width', '80px');

  leftWl = createSlider(1, 100, 50);
  leftWl.position(cnv.position().x+160, cnv.position().y+10);
  leftWl.style('width', '80px');

  rightWl = createSlider(1, 100, 50);
  rightWl.position(cnv.position().x+160, cnv.position().y+40);
  rightWl.style('width', '80px');
}

function draw() {
  background(255);

  fill(0);

  text('left : a',10, 27);
  text('right : a',3, 57);
  text('λ', 150, 27);
  text('λ', 150, 57);

  lp.move(rp);
  rp.move(lp);

  lp.draw();
  rp.draw();


  noFill();

  stroke(255,0,0);
  beginShape();
  for (let i = 101; i < lp.pts.length; i++) {
    vertex(50+i-100, height/2+lp.pts[i]);
  }
  endShape();

  stroke(0,0,255);
  beginShape();
  for (let i = 101; i < lp.pts.length; i++) {
    vertex(50+i-100, height/2+rp.pts[rp.pts.length-i+101]);
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
