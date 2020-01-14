var canvas, canvasContext, debugText;
var framesPerSecond = 30;

var numberOfPlayers = 2;
var arrayOfPlayers = [];
var arrayOfProjectiles = [];
var arrayOfExplosions = [];

var playerTurn = 0;
var incrementTurn = false;

var deltaTime = 0;
var lastFrameTime = window.performance.now();
var elapsed = 0;
var frameStepSize = 1/60;
var now;

const GAME_MODE = 0;
const TITLE_SCREEN = 1;
var mode = TITLE_SCREEN;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	stats = document.getElementById('stats');
	weapon = document.getElementById('weapon');

	gameStart();
}

function gameStart() {
	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayers[i] = new tankClass();

		arrayOfPlayers[i].x = lerp(0, canvas.width, (i+1)/(numberOfPlayers+1));
		arrayOfPlayers[i].y = canvas.height - 100;
		arrayOfPlayers[i].angle = lerp(45, 135, i/(numberOfPlayers-1)); 
		arrayOfPlayers[i].color = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));

	}

	arrayOfPlayers[0].myTurn = true;

	window.requestAnimationFrame(frameLoop);
}

function frameLoop() {

	now = window.performance.now();

	deltaTime = deltaTime + Math.min(1, (now-lastFrameTime) / 1000);

	while (deltaTime > frameStepSize) {
		deltaTime = deltaTime - frameStepSize;
		update(frameStepSize);
	}


	lastFrameTime = now;

	window.requestAnimationFrame(frameLoop);
}

function update(frameTime) {
	switch (mode) {
		case GAME_MODE:
			modeGame(frameTime);
			break;
		case TITLE_SCREEN:
			modeTitle(frameTime);
			break;
	}
	
}

function modeGame(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");	
	colorRect(0, canvas.height - 100, canvas.width, canvas.height, "Grey");

	stats.innerHTML = "Player " + pad(playerTurn+1, 2) + " Angle "  + pad(Math.round(arrayOfPlayers[playerTurn].angle), 3) + " Power " + pad(Math.round(arrayOfPlayers[playerTurn].power), 3) + " Health " + pad(Math.round(arrayOfPlayers[playerTurn].health), 3);
	weapon.innerHTML = arrayOfPlayers[playerTurn].weapon;

	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayers[i].update(frameTime);
		arrayOfPlayers[i].draw(frameTime);
	}
	for (var i = 0; i < arrayOfProjectiles.length; i++) {
		arrayOfProjectiles[i].update(frameTime);
		arrayOfProjectiles[i].draw(frameTime);
	}
	for (var i = 0; i < arrayOfExplosions.length; i++) {
		arrayOfExplosions[i].update(frameTime);
		arrayOfExplosions[i].draw(frameTime);
	}

	Key.update();
	cleanLists();
	nextTurn()
}

function modeTitle(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");	
	colorRect(100, 100, canvas.width-200, canvas.height-200, "Grey");
	colorText("Tank Game", canvas.width/2 - 125, canvas.height/2, "White", "50px Arial");

	if (Key.isJustPressed(Key.SPACE)){
		mode = GAME_MODE;
	}

	Key.update();
}

function nextTurn() {
	if (incrementTurn) {
		arrayOfPlayers[playerTurn].myTurn = false;

		playerTurn++;
		if (playerTurn >= numberOfPlayers) {
			playerTurn = 0;
		}

		arrayOfPlayers[playerTurn].myTurn = true;

		incrementTurn = false;
	}
}

function cleanLists() {
	for (var i = 0; i < arrayOfProjectiles.length; i++) {
		if (!arrayOfProjectiles[i].active) {
			arrayOfProjectiles.splice(i, 1);
			i--;
		}
	}
	for (var i = 0; i < arrayOfExplosions.length; i++) {
		if (!arrayOfExplosions[i].active) {
			arrayOfExplosions.splice(i, 1);
			i--;
		}
	}
}