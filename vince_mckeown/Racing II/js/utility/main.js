var canvas;
var canvasContext;

var now = new Date();
var time = 0;

var playerOne = new carClass();
var playerTwo = new carClass();
var computerPlayerOn = true;
	
window.onload = function(){
			
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
				
	loadImages();
	
	initInput();	
	
	canvas.addEventListener('mousemove', function(evt) {
	
	var mousePos = calculateMousePos(evt);
	
	MousePosX = mousePos.x;
	MousePosY = mousePos.y;
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	playerOne.carReset();
	playerTwo.carReset();
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	playerTwo.carInit(carPic2, "Red Car", true);
	playerOne.carInit(carPic, "Green Car", false);
	loadLevel(levelOne);
}

function updateTime(){
	now = new Date();
}
	
function moveEverything() {
	
	playerOne.movement();
	playerTwo.movement();
	playerOne.checkCarCollisionAgainst(playerTwo);	
	playerTwo.checkCarCollisionAgainst(playerOne);	
	updateTime();
}
			
function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX, 
		y: mouseY
	};
}

function drawClock(){
	canvasContext.drawImage(clockPic, 350, 2);
	colorText(playerOne.minuteTensSpot.toString() + playerOne.minute.toString() + ':' + playerOne.secondTensSpot.toString() + playerOne.second.toString() +':'+playerOne.tenthSecond.toString(), 368, 30, 'black');
}

function drawLapOneTime(){
	colorText(playerOne.lapMinuteTensSpot.toString() + playerOne.lapMinute.toString() + ':' + playerOne.lapSecondTensSpot.toString() + playerOne.lapSecond.toString() +':'+playerOne.lapTenthSecond.toString(), 700, 30, 'black');
}

						
function drawEverything() {
				
	//clears screen
	colorRect(0,0,canvas.width,canvas.height, 'black');			
	drawTracks();
	playerOne.drawCar();
	playerTwo.drawCar();
	drawClock();
	drawLapOneTime();
}