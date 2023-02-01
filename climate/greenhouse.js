let photons = [];
let t = 0;
let temp = 1;
let gas;
let power;
let albedo;
let concentration;
let total = 0;
let left = 0;
let inbound = 0;

function setup() {
  cnvs = createCanvas(800, 500);
  cnvs.parent('cnv')
  noStroke();

  gas = createSelect();
  gas.position(cnvs.position().x+720, cnvs.position().y+25);
  gas.option("CO2");
  gas.option("CH4");
  gas.option("N2O");
  gas.changed(changeGas);

  power = createSlider(1, 101, 21, 10);
  power.position(cnvs.position().x+720, cnvs.position().y+55);
  power.style('width', '65px');

  albedo = createSlider(0, 100, 50, 10);
  albedo.position(cnvs.position().x+720, cnvs.position().y+85);
  albedo.style('width', '65px');

  concentration = createSlider(1, 51, 21, 10);
  concentration.position(cnvs.position().x+720, cnvs.position().y+115);
  concentration.style('width', '65px');
}


function draw() {
  background(153, 196, 250);

  for (let i = 0; i < photons.length; i++)
    photons[i].draw();

  fill(245, 178, 30);
  circle(100, 100, 75 + abs(((t)%60)-30)/20);

  fill(0,200,0);
  rect(0, 450, 800, 50);


  fill(250);
  rect(18, 402, 14, -104)
  fill(200,0,0);
  if ((inbound-left)/2 > 100)
    rect(20, 400, 10, -100);
  else
    rect(20, 400, 10, -(inbound-left)/2);


  fill(0,100,0,100);
  if (gas.value() == "CH4")
    fill(0,100,0,150);
  else if (gas.value() == "N2O")
    fill(0,100,0,200);

  rect(0, 200-concentration.value()/2, width, concentration.value());


  fill(0);

  textSize(15);
  fill(0);
  text("Gas: ", 670, 40);
  text("Sun's Power: ", 629, 70);
  text("Albedo: ", 665, 100);
  text("Concentration: ", 622, 130);

  text("Photons in", 40, 350);
  text("Atmosphere", 40, 365);

  push();
  textSize(20);
  text("" + (temp-1) + " photons absorbed into thermal heat", 240, 480);
  pop();

  update();
}

function update() {
  print(photons.length);
  t++;

  for (let i = 0; i < photons.length; i++) {
    let status = photons[i].update(albedo.value(), temp);
    if (status == 1 || status == 2)
      total++;
    if (status == 1)
      temp++;
    if (status == 3) {
      if (temp < 0)
        temp = 1;
      temp--;
    }

//     greenhouse effect
    let probability = 10;
    if (gas.value() == "CH4")
      probability = 50;
    else if (gas.value() == "N2O")
      probability = 30;

    if (photons[i].name == "infrared" && photons[i].y < 200+concentration.value()/2 && photons[i].y > 200-concentration.value()/2 && Math.floor(Math.random() * 100)+1 <= probability) {
      // photons[i].vy *= -1;

      let ang = Math.random() * TWO_PI;
      let vx = photons[i].vx;
      let vy = photons[i].vy;

      let magnitude = sqrt(vx*vx + vy*vy);
      let new_vx = magnitude*cos(ang);
      let new_vy = magnitude*sin(ang);

      photons[i].vy = new_vy;
      photons[i].vx = new_vx;

    }

    if (photons[i].y < -5) {
      photons.splice(i, 1);
      left++;
    }

  }

  if (t % (Math.floor(101/power.value())*2) == 0) {
    let x = 80 + Math.floor((Math.random() * 40) + 1);
    let y = 80 + Math.floor((Math.random() * 40) + 1);
    photons.push(new Photon(x, y));
    inbound++;
  }
}

function changeGas() {
  temp = 1;
  total = 0;
}
