let iMS;
let iTS;
let wMS;
let wTS;

let mi = 500;
let mw = 5000;
let ti = 0;
let tw = 30;

let ini_mi = 500;
let ini_mw = 5000;
let ini_ti = 0;
let ini_tw = 30;

let start;

let tf = 0;
let melted = 0;
let freezed = 0;

let iPos = 200;
let iVel = 0;

let capIce = 2.2; // J/kgK
let latIce = 334; // J/kg
let capWater = 4.2; // J/kgK

let status = 0; // 0 = waiting, 1 = dropping, 2 = reacting

function setup() {
  cnvs = createCanvas(400, 400);
  cnvs.parent('cnvs');

  iMS = createSlider(0, 2000, 500);
  iMS.position(cnvs.position().x+10,cnvs.position().y+ 10);
  iMS.style('width', '80px');

  iTS = createSlider(-50, 0, 0);
  iTS.position(cnvs.position().x+10,cnvs.position().y+ 40);
  iTS.style('width', '80px');

  wMS = createSlider(0, 10000, 5000);
  wMS.position(cnvs.position().x+10,cnvs.position().y+ 70);
  wMS.style('width', '80px');

  wTS = createSlider(0, 100, 30);
  wTS.position(cnvs.position().x+10,cnvs.position().y+ 100);
  wTS.style('width', '80px');

  start = createButton('Drop Ice Cube');
  start.position(cnvs.position().x+260,cnvs.position().y+ 50);
  start.mousePressed(startR);
}

function draw() {
  if (Number(theme) >= 0 && Number(theme) <= 3)
    background("#99aab5 ");
  else
    background(255);

  fill(0);
  rect(100, height, 5, -130);
  rect(105,height, 150, -5);
  rect(255, height, 5, -130);

  fill(50,50,255);
  let h = sqrt(mw);
  rect(105, height-5, 150, -h);

  fill(150,150,255);
  let w = sqrt(mi);
  rect(180-w/2, iPos-w/2, w, w);

  fill(0);
  text("Ice mass = " + mi + " kg", 100, 25);
  text("Ice temp = " + ti + " C", 100, 55);
  text("Water mass = " + mw + " kg" , 100, 85);
  text("Water temp = " + tw + " C", 100, 115);

  push();
  textSize(15);

  if (status === 2) {
    text("Final Temp:", 270,100);
    stroke(0);
    text(round(tf*1000)/1000 + " C or " + round((tf+273)*1000)/1000 + " K", 240,120);
  }
  pop();
  push();
  textSize(10);
  text("0                 2000", 10, 40);
  text("-50                  0", 10, 70);
  text("0                10000", 10, 100);
  text("0                  100", 10, 130);
  pop();

  update();
}

function update() {

  if (iMS.value() != ini_mi || wMS.value() != ini_mw || iTS.value() != ini_ti || wTS.value() != ini_tw) {
    ini_mi = iMS.value();
    ini_mw = wMS.value();
    ini_ti = iTS.value();
    ini_tw = wTS.value();

    status = 0;
    iPos = 200;
    iVel = 0;

    mi = ini_mi;
    mw = ini_mw;
    ti = ini_ti;
    tw = ini_tw;
  }

  if (status === 2) {
    if (freezed < ini_mw && mw > freezed) {
      mw-=5;
      mi+=5;
    }
    if (melted < ini_mi &&mi > melted) {
      mi-=5;
      mw+=5;
    }

    if (ti < round(tf*10)/10)
      ti+=1;
    else
      ti = round(tf*10)/10;
    if (tw > round(tf*10)/10)
      tw-=1;
    else
      tw = round(tf*10)/10;

  } else if (status === 1) {
    iVel += 0.1;
    iPos += iVel;
    if (iPos >= height-sqrt(wMS.value())) {

      status = 2;
      let q1 = mi*capIce*(0-ti);
      let q2 = mi*latIce;
      let q3 = mw*capWater*tw;
      let q4 = mw*latIce;


      tf = 0;
      melted = 0;
      freezed = 0;
      if (q1 > q3) {
  //       all water goes to 0
        if (q1 > q3 + q4) {
  //         all freezes and cools down
          freezed = mw;
          tf = (mw*latIce + mw*capWater*tw + mi*capIce*ti)/(mi*capIce-mw*capIce);
        } else if (q1 === q3+q4) {
  //         exactly all will be ice at T = 0
          freezed = mw;
        } else {
  //         only some water will freeze
          freezed = (-mi*capIce*ti - mw*capWater*tw)/latIce;
        }
      } else if (q1 === q3) {
  //       final temp is 0, no fusion

      } else {
  //       all ice goes to 0
        if (q1 + q2 < q3) {
  //         all ice melts and heats up
          tf = (-mi*capIce*ti + mi*latIce - mw*capWater*tw)/(-mw*capWater-mi*capWater);
          melted = mi;
        } else if (q1 + q2 === q3) {
  //         all will melt at T = 0
          melted = mi;
        } else {
  //         only some ice will melt into water
          melted = (mw*capWater*tw + mi*capIce*ti)/latIce;
        }
      }

      melted = mi-melted;
      freezed = mw-freezed;

    }
  }

}

function startR() {
    iPos = 200;
    iVel = 0;
    status = 1;
    freezed = 0;
    melted = 0;

    mi = ini_mi;
    mw = ini_mw;
    ti = ini_ti;
    tw = ini_tw;
}
