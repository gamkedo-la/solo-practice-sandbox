var canvas;
var canvasContext;
canvas = document.getElementById("gameCanvas");
canvasContext = canvas.getContext("2d");

// b = ball; p = paddle
const bw = 10;
const bh = 10;
var bx = 400;
var by = 300;

const PH = 50;
const tolerance = PH / 4;

const PW = 8;
const pOffset = 5;
const p1x = 0 + pOffset;
var p1y = 200;
const p2x = canvas.width - pOffset - PW;
var p2y = canvas.height / 2;

const p2speed = 4;

var ballSpeedX = 5;
var ballSpeedY = 2;

var score1 = 0;
var score2 = 0;
const winScore = 3;
var showEnd = false;

function calcMousePos(e) {
  let canv = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - canv.left - root.scrollLeft;
  let mouseY = e.clientY - canv.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY,
  };
}

function handleClick() {
  if (showEnd) {
    showEnd = false;
    score1 = 0;
    score2 = 0;
  }
}

window.onload = function () {
  let framesPerSecond = 30;

  setInterval(function () {
    moveAll();
    drawAll();
  }, 1000 / framesPerSecond);

  canvas.addEventListener("mousedown", handleClick);

  canvas.addEventListener("mousemove", function (e) {
    var mousePos = calcMousePos(e);
    p1y = mousePos.y - PH / 2;
  });
};

function colourRect(leftX, topY, width, height, colour) {
  canvasContext.fillStyle = colour;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colourCirc(centreX, centreY, radius, colour) {
  canvasContext.fillStyle = colour;
  canvasContext.beginPath();
  canvasContext.arc(centreX, centreY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function drawNet() {
  for (var i = 0; i < canvas.height; i += 40) {
    colourRect(canvas.width / 2 - 1, i, 2, 20, "white");
  }
}
function drawAll() {
  colourRect(0, 0, canvas.width, canvas.height, "black");
  if (showEnd) {
    canvasContext.fillStyle = "white";
    if (score1 >= winScore) {
      canvasContext.fillText("Left Player Won", 300, 200);
    } else if (score2 >= winScore) {
      canvasContext.fillText("Right Player Won", 300, 200);
    }
    canvasContext.fillText("Click to play again", 300, 300);
    return;
  }
  colourCirc(bx, by, bw / 2, "red");
  colourRect(p1x, p1y, PW, PH, "white");
  colourRect(p2x, p2y, PW, PH, "white");
  drawNet();

  canvasContext.fillText("Score: " + score1, 100, 100);
  canvasContext.fillText("Score: " + score2, canvas.width - 100, 100);
}

function ballReset() {
  if (score1 >= winScore || score2 >= winScore) {
    showEnd = true;
  }
  bx = canvas.width / 2;
  by = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

// opponent paddle moves to return ball
function paddleAI() {
  let p2c = p2y + PH / 2;
  if (p2c < by - tolerance) {
    p2y += p2speed;
  } else if (p2c > by + tolerance) {
    p2y -= p2speed;
  }
}

function moveAll() {
  if (showEnd) {
    return;
  }
  paddleAI();
  bx += ballSpeedX;
  by += ballSpeedY;

  if (bx > canvas.width - PW - pOffset - bw / 2) {
    if (by > p2y && by < p2y + PH) {
      ballSpeedX = -ballSpeedX;
      let deltaY = (by - (p2y + PH / 2)) / PH;
      console.log(deltaY);
      ballSpeedY = deltaY * 15;
    }
  }
  if (bx > canvas.width) {
    score1++;
    ballReset();
  }
  if (bx < 0 + PW + pOffset + bw / 2) {
    if (by > p1y && by < p1y + PH) {
      ballSpeedX = -ballSpeedX;
      let deltaY = (by - (p1y + PH / 2)) / PH;
      console.log(deltaY);
      ballSpeedY = deltaY * 15;
    }
  }
  if (bx < 0) {
    score2++; // must increment before ballReset
    ballReset();
  }
  if (by > canvas.height - bw / 2) {
    ballSpeedY = -ballSpeedY;
  }
  if (by < 0 + bw / 2) {
    ballSpeedY = -ballSpeedY;
  }
}