var ship;
var asteroids = [];
var lasers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 3; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);

  asteroids.forEach((asteroid) => {
    asteroid.render();
    asteroid.update();
    asteroid.edges();
  });
  lasers.forEach((laser) => {
    laser.render();
    laser.update();
    asteroids.forEach((asteroid) => {
      if (laser.hits(asteroid)) {
        var newAsteroids = asteroid.breakup();
        asteroids.push(newAsteroids);
        asteroids.splice(asteroid, 1);
      }
    });
  });
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

function keyReleased() {
  ship.setRotation(0);
}
function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if ((keyCode = UP_ARROW)) {
    ship.boost();
  } else if ((keyCode = DOWN_ARROW)) {
    ship.boost();
  }
}
