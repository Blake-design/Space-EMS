var ship;
var hud;
var planet;
var asteroids = [];
var lasers = [];
var canPlay = true;
var shieldTime = 180;

let spaceship;
function preload() {
  spaceship = loadImage('./game/spaceShip.svg');
}

var score = 0;
var lives = 1;
var points = [100, 50, 20];
var level = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight / 2);
  canvas.parent('game-window');

  ship = new Ship();

  spawnAsteroids();

  planet = new Planet();
}

function draw() {
  // Handles the round loss, destruction of ship and round restart when the
  // ship contacts an asteroid.
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i]) && canPlay) {
      canPlay = false;
      ship.destroy();
      input.reset();
      setTimeout(function () {
        lives--;
        if (lives >= 0) {
          ship = new Ship();
          canPlay = true;
        }
      }, 3000);
    }
    console.log();
    // asteroids[i].update();
  }

  // Update the lasers' positions
  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].update();
    if (lasers[i].offscreen()) {
      // Destroy lasers that go off screen.
      lasers.splice(i, 1);

      continue;
    }

    for (var j = asteroids.length - 1; j >= 0; j--) {
      if (lasers[i].hits(asteroids[j])) {
        // Handle laser contact with asteroids
        score += points[asteroids[j].size];

        // The new smaller asteroids broken lasers are added to the same list
        // of asteroids, so they can be referenced the same way as their full
        // asteroid counterparts.
        var newAsteroids = asteroids[j].breakup();
        asteroids = asteroids.concat(newAsteroids);

        // Laser and previous asteroid are removed as per the rules of the game.
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        if (asteroids.length == 0) {
          // Next level
          level++;
          spawnAsteroids();
          ship.shields = shieldTime;
        }
        break;
      }
    }
  }

  ship.update();
  background(0);

  planet.render();

  asteroids.forEach((asteroid) => {
    asteroid.render();
  });

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
  }

  ship.render();
  console.log();
  hud.render();
}

function spawnAsteroids() {
  for (var i = 0; i < level + 5; i++) {
    asteroids.push(new Asteroid(null, null, 2));
  }
}

function cross(v1, v2) {
  return v1.x * v2.y - v2.x * v1.y;
}

function lineIntersect(l1v1, l1v2, l2v1, l2v2) {
  var base = p5.Vector.sub(l1v1, l2v1);
  var l1_vector = p5.Vector.sub(l1v2, l1v1);
  var l2_vector = p5.Vector.sub(l2v2, l2v1);
  var direction_cross = cross(l2_vector, l1_vector);
  var t = cross(base, l1_vector) / direction_cross;
  var u = cross(base, l2_vector) / direction_cross;
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return true;
  } else {
    return false;
  }
}
