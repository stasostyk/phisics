let wave = []
let t = 0;
let sel;
let type = "longitudinal";
let dtime = [];


function setup() {
  cnvs = createCanvas(800, 400);
  cnvs.parent('cnvs');

  sel = createSelect();
  sel.position(cnvs.position().x+100, cnvs.position().y+320);
  sel.option('longitudinal');
  sel.option('transversal');
  sel.changed(changeType);

  for(var i = 0; i < 20; i++) {
    wave.push(0);
  }
}

function draw() {
  if (Number(theme) >= 0 && Number(theme) <= 3)
    background("#99aab5 ");
  else
    background(255);
  fill(0);
//   longitude
  for (let i = 0; i < wave.length; i++) {
    for (let j = 0; j < 10; j++) {
      if (j===0 && i === 0)
          fill(255, 215, 0);
      if (type === 'longitudinal')
        circle(50+i*10+wave[i], 100+j*15, 10);
      else
        circle(50+i*10, 100+j*15+wave[i], 10);
      if (j===0 && i === 0)
          fill(0);
    }
  }

  strokeWeight(2);
  line(600,50,600,150);
  line(600,100,700,100);
  line(600,300,700,300);
  line(600,250,600,350);
  strokeWeight(0.9);
  text("position-displacement", 600, 30);
  text("time-displacement", 600, 230);
  text("wave type: ", 115,300, 230);

// position-displacement graph
  noFill();
  strokeWeight(5);
  beginShape();
  for (let i = 0; i < wave.length; i++)
    vertex(600+i*5, 100+wave[i]*2);
  endShape();

//   displacement-time graph
  stroke(255, 215, 0);
  beginShape();
  for (let i = 0; i < dtime.length; i++)
    vertex(600+i, 300+dtime[i]*2);
  endShape();
  stroke(0);
  fill(255);
  strokeWeight(1);


  for (let i = 0; i < wave.length; i++) {
    wave[i] = 20*sin((TWO_PI/30)*(t+i));
  }
  t+=0.2;

  dtime.push(wave[0]);
  if (dtime.length >= 100)
    dtime.shift();
}

function changeType() {
  for (let i = 0; i < wave.length; i++) {
    wave[i] = 0;
  }

  type = sel.value();
}
