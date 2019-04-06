// A-Star implementation based on http://buildnewgames.com/astar/ 
// by Gamkedo's own Christer "McFunkpants" Kaitila! ツ
// --> www.mcfunkypants.com <--

const BRICK_W = 40;
const BRICK_H = 40;
const BRICK_GAP = 1;
const BRICK_COLS = 20;
const BRICK_ROWS = 15;

const GROUND = 0;
const BRICK = 1;
const ENEMY = 2;

var world = [[]];
var pathStart = [BRICK_COLS, BRICK_ROWS];
var pathEnd = [0,0];
var currentPath = [];

function createWorld()
{ 
	// create emptiness
	for (var x = 0; x < BRICK_COLS; x++) {
		world[x] = [];

		for (var y=0; y < BRICK_ROWS; y++) {
			world[x][y] = 0;
		}
	}
}
  
function brickTileToIndex(tileCol, tileRow) {
	return (tileCol + BRICK_COLS*tileRow);
}
  
function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
	var tileCol = hitPixelX / BRICK_W;
	var tileRow = hitPixelY / BRICK_H;

	// using Math.floor to round down to the nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	// first check whether the slider is within any part of the brick wall
	if(tileCol < 0 || tileCol >= BRICK_COLS ||
	   tileRow < 0 || tileRow >= BRICK_ROWS) {
		return false;
	}

	var brickIndex = brickTileToIndex(tileCol, tileRow);
	return (world[tileCol][tileRow] == BRICK);
}

function drawBricks() {
	for(var eachCol=0; eachCol<BRICK_COLS; eachCol++) { // in each column...
  		for(var eachRow=0; eachRow<BRICK_ROWS; eachRow++) { // in each row within that col
		    if( isBrickAtTileCoord(eachCol, eachRow) ) {
		      var brickLeftEdgeX = eachCol * BRICK_W;
		      var brickTopEdgeY = eachRow * BRICK_H;
		      colorRect(brickLeftEdgeX, brickTopEdgeY,
               BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue' );
    		} // end of isBrickAtTileCoord()
  		} // end of for eachRow
	} // end of for eachCol
} // end of drawBricks()

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
	//var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
	return (world[brickTileCol][brickTileRow] == BRICK);
}