// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  
  player.setupControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
  if (thisKey == thisPlayer.controlKeyForNorth) {
    thisPlayer.keyHeld_North = setTo;
    document.getElementById("debugText").innerHTML = "Pressed: " + thisKey;
  }
  if (thisKey == thisPlayer.controlKeyForEast) {
    thisPlayer.keyHeld_East = setTo;
    document.getElementById("debugText").innerHTML = "Pressed: " + thisKey;
  }
  if (thisKey == thisPlayer.controlKeyForSouth) {
    thisPlayer.keyHeld_South = setTo;
    document.getElementById("debugText").innerHTML = "Pressed: " + thisKey;
  }
  if (thisKey == thisPlayer.controlKeyForWest) {
    thisPlayer.keyHeld_West = setTo;
    document.getElementById("debugText").innerHTML = "Pressed: " + thisKey;
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, player, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, player, false);
}