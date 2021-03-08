import Ball from 'components/Ball';

import {GAME_WIDTH, GAME_HEIGHT} from 'constants/game_settings';

import * as CanvasController from 'controllers/CanvasController';
import EnemyController from 'controllers/EnemyController';
import PlayerController from 'controllers/PlayerController';

let prev = Date.now();
let deltaTime = 0;

export const GAMESTATE = {
  PAUSING: 'GAMESTATE.PAUSING',
  PLAYING: 'GAMESTATE.PLAYING',
}

let stateCurr = GAMESTATE.PLAYING;
let gameObjectList = [];

const CurrentBall = new Ball({
  position: {
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT / 2,
  },
});

export function init() {
  CanvasController.init();
  EnemyController.init();
  PlayerController.init();

  EnemyController.set('target', CurrentBall);

  gameObjectList.push(EnemyController.gameobject);
  gameObjectList.push(PlayerController.gameobject);
  gameObjectList.push(CurrentBall);

  // activate updating
  const myInterval = setInterval(tick, 0);
}

function tick() {
  const now = Date.now();
  deltaTime = now - prev;
  prev = now;

  update();
}

export function update() {
  if (stateCurr === GAMESTATE.PAUSING) return;

  EnemyController.update(deltaTime);
  PlayerController.update(deltaTime);
  CurrentBall.update(deltaTime);

  checkCollisions();
  draw();
}

export function draw() {
  CanvasController.draw();
  EnemyController.draw(CanvasController.context);
  PlayerController.draw(CanvasController.context);

  CurrentBall.draw(CanvasController.context);
}

export function checkCollisions() {
  gameObjectList.forEach((gameObject) => {
    gameObjectList.forEach((otherObject) => {
      // same object
      if (gameObject.get('id') === otherObject.get('id')) {
        return;
      }

      // collision
      if (gameObject.isOverlapping(otherObject)) {
        gameObject.onCollide(otherObject);
      }
    });
  });

  if (CurrentBall.bottom > GAME_HEIGHT - 10) {
    PlayerController.hpDecrease(1);
  }

  if (CurrentBall.top < 10) {
    EnemyController.hpDecrease(1);
  }
}
