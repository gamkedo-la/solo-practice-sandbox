// arrow keys for player1 car movement
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;


// keyboard hald state variables, to use keys more like buttons
let keyHeld_Gas = false;
let keyHeld_Reverse = false;
let keyHeld_TurnLeft = false;
let keyHeld_TurnRight = false;

function initInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
}

function setKeyHoldState(thisKey, thisCar, setTo) {
  if(thisKey == thisCar.controlKeyForGas){
    thisCar.keyHeld_Gas = setTo;
  }
  if(thisKey == thisCar.controlKeyForReverse){
    thisCar.keyHeld_Reverse = setTo;
  }
  if(thisKey == thisCar.controlKeyForTurnLeft){
    thisCar.keyHeld_TurnLeft = setTo;
  }
  if(thisKey == thisCar.controlKeyForTurnRight){
    thisCar.keyHeld_TurnRight = setTo;
  }
}

function keyPressed(evt) {
  // document.getElementById("debugText").innerHTML = "KeyCode Pushed: " + evt.keyCode;

  setKeyHoldState(evt.keyCode, P1, true);

  evt.preventDefault(); // without this, arrow keys scroll the browser
}

function keyReleased(evt) {
  // document.getElementById("debugText").innerHTML = "KeyCode Released: " + evt.keyCode;

  setKeyHoldState(evt.keyCode, p1,false);
}