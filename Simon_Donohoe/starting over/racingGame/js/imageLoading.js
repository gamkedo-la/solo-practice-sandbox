let trackPicRoad = document.createElement("img"); // road image
let trackPicWall = document.createElement("img"); // wall image
let carPic = document.createElement("img"); // make the car an image
let trackPicGoal = document.createElement("img"); // image for finish-line
let trackPicTree = document.createElement("img"); // image for tree
let trackPicFlag = document.createElement("img"); // image for flag

let picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) {
    loadingDoneSoStartGame();
  }
}

function loadImages() {
  let imageList = [
    {varName:carPic, theFile:"player1.png"},
    {varName:trackPicRoad, theFile:"track_road.png"},
    {varName:trackPicWall, theFile:"track_wall.png"},
    {varName:trackPicGoal, theFile:"track_goal.png"},
    {varName:trackPicTree, theFile:"track_tree.png"},
    {varName:trackPicFlag, theFile:"track_flag.png"}
  ];

  picsToLoad = imageList.length; // sets it to 3, since 3 Object literals in array

  for(let i = 0; i < imageList.length; i++) {
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  }
}

function beginLoadingImage(imgVar, fileName){
  imgVar.onload = countLoadedImageAndLaunchIfReady;
  imgVar.src = "./img/"+fileName;
}