const PLAYER_SHIP_WIDTH = 144; //current width of pixel art
const PLAYER_SHIP_HEIGHT = 110; //current height of pixel art 
const PLAYER_POS_Y = 600 - PLAYER_SHIP_HEIGHT - 30;
const PLAYE_POS_X = 400 - PLAYER_SHIP_WIDTH/2;
const WIN_SCORE = 5;
var playerScore = 0;
var playerShields = 1;
var shieldRotationSpeed = 0;

function playerClass() {

	this.x = PLAYE_POS_X;
	this.y = PLAYER_POS_Y;
	this.speedBuffer = false;
	this.shield01 = true;
	this.myShot = [];
	this.reverseSpeed = 3;

	this.fireShot = function () {
		var newShot = new playerBasicShotClass();
		newShot.basicWeaponActive = true;
		newShot.x = this.x + PLAYER_SHIP_WIDTH/2;
		this.myShot.push(newShot);
	}

	this.draw = function() {
		//space ship
		if(spaceshipPicLoaded){
			ctx.drawImage(spaceshipPic, this.x, this.y);
		}

		//ship shield
		if(this.shield01) {
			drawBitmapCenteredAtLocationWithRotation(shieldPic, this.x + PLAYER_SHIP_WIDTH/2, this.y + PLAYER_SHIP_HEIGHT/2, shieldRotationSpeed);
		}

		for(var i=0; i < this.myShot.length; i++) {
			this.myShot[i].draw();
		}
	}

	this.move = function () {
		for(var i=0; i < this.myShot.length; i++) {
			this.myShot[i].move();
		}
		for(var i=this.myShot.length - 1; i >= 0 ; i--) { //for loop goes backwards to not skip cause of the splice
			if(this.myShot[i].basicWeaponActive == false) {
				this.myShot.splice(i,1);
			}
		}

		this.moveShield();
		this.spaceshipAutoReverse();
	}

	this.moveShield = function() { // called by this.move
		shieldRotationSpeed += .01;
	}

	this.addShield = function() {
		playerShields ++;
		this.shield01 = true;
	}

	this.substractShield = function() {
		playerShields --;
		if(playerShields == 0) {
			this.shield01 = false;
		}

	}

	this.playerLose = function() {
		mode = GAME_OVER;
	}

	this.spaceshipAutoReverse = function() {
		if(this.y <= PLAYER_POS_Y && this.speedBuffer) {
			this.y += this.reverseSpeed;
		}
	}

	this.playerScoring = function() {
		playerScore ++;
		if(playerScore >= WIN_SCORE){
			mode = WIN_SCREEN;
		}
	}

	this.playerScore = function() {
		colorText("ShotCount: " + this.myShot.length, 700, 540, "15px arial", "orange"); // debug output - remove
		colorText("Score: " + playerScore, 700, 560, "15px arial", "white");
		colorText("Shields: " + playerShields, 700, 580, "15px arial", "white");
	}

}