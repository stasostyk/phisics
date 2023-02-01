let photons = [new Ball(100, 100, 'green')];
let t = 0;
let temp = 1;
let biome;
let power;
let total = 0;

function setup() {
  cnvs = createCanvas(800, 500);
  cnvs.parent('cnv');
  noStroke();

  biome = createSelect();
  biome.position(cnvs.position().x+720, cnvs.position().y+25);
  biome.option("snow");
  biome.option("grass");
  biome.option("ocean");
  biome.option("desert");
  biome.changed(changeBiome);

  power = createSlider(1, 101, 21, 10);
  power.position(cnvs.position().x+720, cnvs.position().y+55);
  power.style('width', '65px');
}


function draw() {
  background(153, 196, 250);

  for (let i = 0; i < photons.length; i++)
    photons[i].draw();

  fill(245, 178, 30);
  circle(100, 100, 75 + abs(((t)%60)-30)/20);

  switch (biome.value()) {
    case "ocean":
      fill(0, 0, 200);
      break;
    case "desert":
      fill(241, 190, 108);
      break;
    case "snow":
      fill(224, 255, 255)
      break;
    default:
      fill(0, 200, 0);
  }
  rect(0, 450, 800, 50);


  fill(250);
  rect(18, 402, 14, -104)
  fill(200,0,0);
  if (temp > 100)
    rect(20, 400, 10, -100);
  else
    rect(20, 400, 10, -temp);

  fill(0);
  if (biome.value() == "ocean")
    fill(255);
  textSize(30);
  text("" + (temp-1) + "/" + total + " photons absorbed", 240, 485);

  textSize(15);
  fill(0);
  text("Biome: ", 670, 40);
  text("Sun's Power: ", 629, 70);

  push();
  rotate(3*PI / 2.0);
  text("Temperature", -395, 50);
  pop();

  update();
  print(photons.length);
}

function update() {
  t++;

  for (let i = 0; i < photons.length; i++) {
    let status = photons[i].update(biome.value(), 1);
    if (status == 1 || status == 2)
      total++;
    if (status == 1)
      temp++;


    if (photons[i].y < -5)
      photons.splice(i, 1);
  }

  if (t % (Math.floor(101/power.value())*4) == 0) {
    let x = 80 + Math.floor((Math.random() * 40) + 1);
    let y = 80 + Math.floor((Math.random() * 40) + 1);
    clr = Math.floor((Math.random() * 3));
    if (clr == 0)
      clr = 'green';
    else if (clr == 1)
      clr = 'blue';
    else
      clr = 'red';
    photons.push(new Ball(x, y, clr));
  }
}

function changeBiome() {
  temp = 1;
  total = 0;
}
