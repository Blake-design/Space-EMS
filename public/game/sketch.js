var ship;
var planet;
var asteroids = [];
var lasers = [];
var spaceship;
var score = 0;

var hud;

var level = 1;

function preload() {
  spaceship = loadImage('./game/spaceShip.svg');
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight / 2);
  canvas.parent('game-window');

  ship = new Ship();
  hud = new Hud();

  spawnAsteroids();

  planet = new Planet();
}

function draw() {
  background(0);

  planet.render();

  asteroids.forEach((asteroid) => {
    asteroid.render();
    asteroid.update();
    asteroid.edges();
    if (ship.hits(asteroid)) {
      console.log('boom you dead ');
      reset();
    }
  });

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          var newAsteroids = asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          score += 1;
          if (asteroids.length == 0) {
            spawnAsteroids();
            level += 1;
          }
          break;
        }
      }
    }
  }
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  hud.render();
}

function spawnAsteroids() {
  for (var i = 0; i < 3; i++) {
    asteroids.push(new Asteroid());
  }
}

function reset() {
  score = 0;
  level = 1;
  asteroids = [];
  spawnAsteroids();
}
