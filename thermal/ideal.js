let numMol = 50;
let balls = [];
let g = 9.8;
let w = 10;
let depth = 10;
let h = 300;
let new_h = 300;
let t = 1500;

let gslider;
let mslider;

// let pres = (numMol* 8.3144598*t)/(depth*w*h);
let pres = 1/(depth*w);

let temp = (pres*depth*w*h)/(numMol*8.3144598);

let weight = 0;
let new_weight = 0;

function setup() {
  cnvs = createCanvas(500, 700);
  cnvs.parent('cnvs')

  gslider = createSlider(0, 2, 1, 0.1);
  gslider.position(cnvs.position().x+150,cnvs.position().y+ 10);
  gslider.style('width', '80px');

  mslider = createSlider(1, 100, 50);
  mslider.position(cnvs.position().x+150,cnvs.position().y+ 60);
  mslider.style('width', '80px');

}

function draw() {
  if (Number(theme) >= 0 && Number(theme) <= 3)
    background("#99aab5 ");
  else
    background(255);

  fill(100);
  rect(150, height-310, 10, height-300);
  rect(350, height-310, 10, height-300);
  rect(160, height, 190, -10);

  fill(50);
  rect(160, height-h-20, 190, 10);

  fill(0);
  rect(0, 150, width, 5);

  fill(0,0,255);
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
  }

  if (Number(theme) >= 0 && Number(theme) <= 3)
    fill(colors[Number(theme)]);
  else
    fill(0,0,0);
  for (let i = 0; i < numMol; i++) {
      circle(random(165, 335), height-10-random(0, h), 5);
  }

  push();
  fill(0);
  textSize(15);
  text("P ≈ " + round(pres*1000)/1000 + " Pa", 10, 20);
  text("Δy ≈ " + (300 - round(h*1000)/1000) + " m", 10, 40);
  text("V ≈ " + round(h*depth*w*1000)/1000 + " m", 10, 60);
  text("m ≈ " + weight + " kg", 10, 80);
  text("F ≈ " + round(1 + weight*g*1000)/1000 + " N", 10, 100);
  text("T ≈ " + round(temp*1000)/1000 + " K", 10, 120);

  text("Click here to spawn", 180, 210);

  text("g [m/s  ]", 240, 25);
  text("# of molecules", 240, 75);
  textSize(11);
  text("0                 2", 155, 45);
  text("1                 100", 155, 95);
  text("3", 92, 55);
  text("2", 282, 20);
  pop();

  update();
}

function update() {
  if (gslider.value() != g) {
    g = gslider.value();
    reset();
  }
  if (mslider.value() != numMol) {
    numMol = mslider.value();
    reset();
  }

  if (weight != new_weight) {
    new_h = h*(1+weight*g)/(1+new_weight*g);

    pres = (1+new_weight*g)/(w*depth);
    weight = new_weight;
  }

  if (h > new_h) {
    h -= 1;
  }

  let c_weight = 0;

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].y < height-h-25) {
      balls[i].v += g/50;
      balls[i].y+=balls[i].v;
    } else {
      balls[i].v = 0;
      balls[i].y = height-h-24;
    }
    if (balls[i].y === height-h-24)
      c_weight++;
    }

  new_weight = c_weight;

}

function mouseReleased() {
  if (mouseX > 160 && mouseX < 345 && mouseY > 150 && mouseY < height-h-25) {
    balls.push(new Ball(mouseX, mouseY));
  }
}

function reset() {
  balls = [];
  h = 300;
  new_h = 300;
  pres = 1/(depth*w);
  weight = 0;
  new_weight = 0;
  temp = (pres*depth*w*h)/(numMol*8.3144598);
}
