var playerShouldBePlayingSnake = false;
var playerShouldBePlayingBird = false;
var playerShouldBePlayingLane = false;
var playerShouldBePlayingJumper = false;
var playerShouldBePlayingFinder = false;
var playerShouldBePlayingCatcher = false;
var playerShouldBePlayingShooter = false;
var playerShouldBePlayingSpaceShooter = false;

var frameRate = 1000/30;

function gameCanvasClick()
{
  if (playerShouldSeeDualPurposeLoadingSplashScreen)
  {
    handleDualPurposeSplashAndLoadingSceneClick();//dualLoadingSplashScreen.js, player advances to main menu after loading
    initializeCorrectLetterAudioTag();
  } else if (playerShouldSeeTitleScreen)
  {
    handleGameCellClicks();//titleScreen.js, player chooses a game
    initializeSpecificGameSettings();//game initializes
  } else if (playerIsPlayingAnyGame)//back button in games
  {
    handleBackButtonClick();//backButton.js, player goes back to menu/title screen
  }
}

var mouseCoordinates = {mouseX:undefined,mouseY:undefined};

function calculateMousePosition(builtInDocumentEventObject)
{
  var rect = gameCanvas.getBoundingClientRect();
  var root = document.documentElement;
  var x = builtInDocumentEventObject.clientX - rect.left - root.scrollLeft;
  var y = builtInDocumentEventObject.clientY - rect.top - root.scrollTop;
  mouseCoordinates.mouseX = x;
  mouseCoordinates.mouseY = y;
}

var leftArrowDown = false;
var rightArrowDown = false;

function keyDown(builtInDocumentEventObject)
{
  console.log(builtInDocumentEventObject.keyCode);
  switch(builtInDocumentEventObject.keyCode)
  {
    case 37://left arrow
    if (playerShouldBePlayingSnake)
    {
      playerSpeedX = -20;
      playerSpeedY = 0;
      console.log(snakeTail);
    } else if (playerShouldBePlayingBird)
    {
      leftArrowDown = true;
    }
    break;

    case 38://up arrow
    if (playerShouldBePlayingSnake)
    {
      playerSpeedX = 0;
      playerSpeedY = -20;
      console.log(snakeTail);

    }
    break;

    case 39://right arrow
    if (playerShouldBePlayingSnake)
    {
      playerSpeedX = 20;
      playerSpeedY = 0;
      console.log(snakeTail);

    }  else if (playerShouldBePlayingBird)
    {
      rightArrowDown = true;
    }
    break;

    case 40://down arrow
    if (playerShouldBePlayingSnake)
    {
      playerSpeedX = 0;
      playerSpeedY = 20;
      console.log(snakeTail);

    }
    break;

    case 32://spacebar
      if (playerShouldBePlayingBird)
      {
        flapUp();
      }
    break;

    case 68://d
    if (debugOn === true)
    {
      debugOn = false;
    } else if (debugOn === false)
    {
      debugOn = true;
    }
    break;
  }
}

function keyUp(builtInDocumentEventObject)
{

  switch(builtInDocumentEventObject.keyCode)
  {
    case 37://left arrow
    if (playerShouldBePlayingBird)
    {
      leftArrowDown = false;
    }
    break;

    case 39://right arrow
    if (playerShouldBePlayingBird)
    {
      rightArrowDown = false;
    }
    break;
  }
}
