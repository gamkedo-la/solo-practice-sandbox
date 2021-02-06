var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');

    colorRect(0, 0 , canvas.width, canvas.height, "black");
    colorText("LOADING", canvas.width/2, canvas.height / 2, "white");

    loadImages();
}

function imageLoadingDoneSoStartGame(){
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);
    
    setupInput();
    blueCar.reset(otherCarPic);
    greenCar.reset(carPic);
}

function updateAll(){
    moveAll();
    drawAll();
}

function moveAll(){
    blueCar.move();
    greenCar.move();
}

function clearScreen(){
    colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen
}


function drawAll(){
    //clearScreen();
    drawTracks();
    blueCar.draw();
    greenCar.draw();
}

