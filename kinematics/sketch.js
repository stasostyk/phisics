let balls = [];
let predictions = [];
let trail = [];

let isSpawning = false;
let spawnX = 0;
let spawnY = 0;

let timer = 0;

let g;
let clearB;

function setup() {
  cnvs = createCanvas(800, 400);
  cnvs.parent('cnvs');

  g = createSlider(0.1, 2, 0.5, 0.1);
  g.position(cnvs.position().x+10,cnvs.position().y+ 10);
  g.style('width', '80px');

  clearB = createButton("Clear");
  clearB.position(cnvs.position().x+30, cnvs.position().y+40);
  clearB.mousePressed(clearBalls);
}

function draw() {
  timer++;
  if (balls.length > 0 && timer%2===0) {
    trail.push([balls[balls.length-1].x, balls[balls.length-1].y]);

    if (trail.length > 25) {
      trail.shift();
    }
  }

  background(255);

  noStroke();
  fill(0);
  text("gravity", 100, 25);

  if (isSpawning) {
    text("y=ViT+0.5*at^2", spawnX, spawnY-10);
    text("Vx="+((spawnX-getMouseX())/10)+"m/s", (spawnX+getMouseX())/2-50, getMouseY());
    text("Vy="+((spawnY-getMouseY())/-10)+"m/s", getMouseX(), (spawnY+getMouseY())/2);
    stroke(0,255,0);
    line(spawnX, spawnY, getMouseX(), getMouseY());
  }

  noStroke()
  fill(0,0,0);

  for (let i = 0; i < trail.length; i++) {
    circle(trail[i][0], trail[i][1], 5);
  }
  fill(255,0,0);
  for (let i = 0; i < predictions; i++) {
    circle(predictions[i][0], predictions[i][1], 5);
  }

  fill(0,0,255);
  stroke(0);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }
}

function getMouseX() {
  return mouseX;
}

function getMouseY() {
  // print(mouseY);
  return mouseY;
}

function mousePressed() {
  let x = getMouseX();
  let y = getMouseY();

  if ((x<0 || x>width || y < 0 || y > height) || (x>0 && x<100 && y < 70 && y > 0)) {
    return;
  }

  isSpawning = true;
  spawnX = x;
  spawnY = y;
}

function mouseReleased() {
  let x = getMouseX();
  let y = getMouseY();

  if (x<0 || x>width || y < 0 || y > height || isSpawning==false) {
    isSpawning = false;
    return;
  }

  isSpawning = false;
  balls.push(new Ball(x,y,(spawnX-x)/10,(spawnY-y)/10,g.value()));
}

function clearBalls() {
  balls = [];
  trail = [];
}
