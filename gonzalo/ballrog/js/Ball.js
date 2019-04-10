var ballX;
var ballY;
var ballVelX = 6;
var ballVelY = -4;
const BALL_RADIUS = 10;
const BASE_BALL_SPEED = 6;
const MAX_SPEED = 40;
var minSpeed = BASE_BALL_SPEED;
var ballMissEvent = new CustomEvent('ballMiss');
var ballResetEvent = new CustomEvent('ballReset');



function ballReset() {
	minSpeed = BASE_BALL_SPEED;
	ballX = paddleX + PADDLE_WIDTH/2;
	ballY = PADDLE_Y - BALL_RADIUS/2;
	updateVelocity(ballVelX, ballVelY > 0 ? -ballVelY : ballVelY);
	updateSpeed(minSpeed);
	var ballResetEvent = new CustomEvent('ballReset');
	canvas.dispatchEvent(ballResetEvent);
}

function updateVelocity(velX, velY) {
	ballVelX = velX;
	ballVelY = velY;
	console.log('CURRENT BALL SPEED', ballSpeed);
}

function updateSpeed(speed) {
	if (speed > MAX_SPEED) {
		speed = MAX_SPEED;
	}
	var dir = getVelocityDir(ballVelX, ballVelY);
	updateVelocity(speed*dir.x, speed*dir.y);
}

function increaseSpeed(evt) {
	minSpeed += (BRICK_ROWS - evt.detail.row)*0.44;
	console.log('NEW SPEED', minSpeed);
	if (minSpeed > getSpeedFromVelocity(ballVelX, ballVelY)) {
		updateSpeed(minSpeed);
	}
}

function getSpeedFromVelocity(velX, velY) {
	return Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2));
}

function getVelocityDir(velX, velY) {
	var speed = getSpeedFromVelocity(velX, velY);
	return {x: velX/speed, y: velY/speed};
}

function ballMove() {
	if (!ballHeld) {
		ballX += ballVelX;
		ballY += ballVelY;
		if ((ballX > canvas.width && ballVelX > 0) || (ballX < 0 && ballVelX < 0)){
			updateVelocity(-1*ballVelX, ballVelY);
			// TODO: dispatch ballHitWall event
		}
		if (ballY > PADDLE_Y && ballY < PADDLE_Y + PADDLE_THICKNESS && ballVelY > 0) {
			if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
				let deltaX = ballX - (paddleX + PADDLE_WIDTH/2);
				updateVelocity(deltaX*0.44, -1*ballVelY);
				let currentSpeed = getSpeedFromVelocity(ballVelX, ballVelY);
				if (currentSpeed < minSpeed) {
					updateSpeed(minSpeed);
				}
				if (resetBricksOnNextPaddleHit) {
					resetBricks();
					resetBricksOnNextPaddleHit = false;
				}
			}
		}
		if (ballY > canvas.height) {
			ballReset();
			canvas.dispatchEvent(ballMissEvent);
		}
		if (ballY < 0) {
			updateVelocity(ballVelX, -1*ballVelY);
		}
		breakAndBounceOffBrickAtPixelCoord(ballX, ballY);
	}
}

function breakAndBounceOffBrickAtPixelCoord(pixelX, pixelY) {
	var tileCol = Math.floor(pixelX / BRICK_W);
	var tileRow = Math.floor(pixelY / BRICK_H);

	if (tileCol < 0 || tileCol >= BRICK_COLS ||
		tileRow < 0 || tileRow >= BRICK_ROWS) {
		return;
	}

	var brickIndex = brickToTileIndex(tileCol, tileRow);


	if (brickGrid[brickIndex] == 1) {
		var prevBallX = ballX - ballVelX;
		var prevBallY = ballY - ballVelY;
		var prevTileCol = Math.floor(prevBallX / BRICK_W);
		var prevTileRow = Math.floor(prevBallY / BRICK_H);

		var bothTestsFailed = true;

		if (prevTileCol != tileCol) { // must have come in horizontally
		    var adjacentBrickIndex = brickToTileIndex(prevTileCol, tileRow);
		    if (brickGrid[adjacentBrickIndex] != 1) {
				updateVelocity(-1*ballVelX, ballVelY);
				bothTestsFailed = false;
		    }
		}
		if (prevTileRow != tileRow) { // must have come in vertically
		    var adjacentBrickIndex = brickToTileIndex(tileCol, prevTileRow);
		    if (brickGrid[adjacentBrickIndex] != 1) {
				updateVelocity(ballVelX, -1*ballVelY);
				bothTestsFailed = false;
		    }
		}

		if (bothTestsFailed) {
			updateVelocity(-1*ballVelX, -1*ballVelY);
		}

		var brickHitEvent = new CustomEvent('brickHit', {detail: {
			index: brickIndex,
			col: tileCol,
			row: tileRow
		}});
		canvas.dispatchEvent(brickHitEvent);
	}
}

function drawBall() {
	drawBitMap(ballPic, ballX - BALL_RADIUS, ballY - BALL_RADIUS);
}
