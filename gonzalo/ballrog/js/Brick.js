const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var resetBricksOnNextPaddleHit = false;

function drawBricks() {
	var noBricksLeft = true;
	for (var eachCol=0; eachCol<BRICK_COLS; eachCol++) {
		for (var eachRow=0; eachRow<BRICK_ROWS; eachRow++) {
		    if(isBrickAtTileCoord(eachCol, eachRow)) {
				var brickLeftEdgeX = eachCol * BRICK_W;
				var brickTopEdgeY = eachRow * BRICK_H;
				noBricksLeft = false;
				drawBitMap(brickPic, brickLeftEdgeX, brickTopEdgeY);
		    }		     
		}
	}
	if (noBricksLeft) {
		resetBricksOnNextPaddleHit = true;
	}
}

function resetBricks() {
	for (var i=0; i<BRICK_COLS * BRICK_ROWS; i++) {
		brickGrid[i] = i > BRICK_COLS*3 -1 ? 1 : 0;
	}
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
	var brickIndex = brickTileCol + BRICK_COLS * brickTileRow;
	return (brickGrid[brickIndex] == 1);
}

function checkForAndRemoveBrickAtPixelCoord(pixelX, pixelY) {
	var tileX = Math.floor(pixelX / BRICK_W);
	var tileY = Math.floor(pixelY / BRICK_H);
	var brickIndex = tileX + BRICK_COLS * tileY;
	var brickPresent = false;
	if (brickIndex < BRICK_COLS * BRICK_ROWS) {
		brickPresent = brickGrid[brickIndex] == 1;
		brickGrid[brickIndex] = 0;
	}
	return brickPresent;
}

function brickToTileIndex(tileCol, tileRow) {
	return tileCol + BRICK_COLS * tileRow;
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
		var prevBallX = ballX - ballSpeedX;
		var prevBallY = ballY - ballSpeedY;
		var prevTileCol = Math.floor(prevBallX / BRICK_W);
		var prevTileRow = Math.floor(prevBallY / BRICK_H);

		var bothTestsFailed = true;

		if (prevTileCol != tileCol) { // must have come in horizontally
		    var adjacentBrickIndex = brickToTileIndex(prevTileCol, tileRow);
		    if (brickGrid[adjacentBrickIndex] != 1) {
				ballSpeedX *= -1;
				bothTestsFailed = false;
		    }
		}
		if (prevTileRow != tileRow) { // must have come in vertically
		    var adjacentBrickIndex = brickToTileIndex(tileCol, prevTileRow);
		    if (brickGrid[adjacentBrickIndex] != 1) {
				ballSpeedY *= -1;
				bothTestsFailed = false;
		    }
		}

		if (bothTestsFailed) {
		    ballSpeedX *= -1;
		    ballSpeedY *= -1;
		}

		brickGrid[brickIndex] = 0; // remove the brick that got hit
	}
}
