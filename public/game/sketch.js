var ship;
var planet;
var asteroids = [];
var lasers = [];
let spaceship;
function preload() {
  spaceship = loadImage('./game/spaceShip.svg');
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight / 2);
  canvas.parent('game-window');

  ship = new Ship();

  for (var i = 0; i < 3; i++) {
    asteroids.push(new Asteroid());
  }

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
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
            asteroids.splice(j, 1);
            lasers.splice(i, 1);
            break;
          }
        }
      }
    }
  }
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}
