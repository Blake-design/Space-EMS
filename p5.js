var ship;
var asteroids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 3; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  asteroids.forEach((asteroid) => {
    asteroid.render();
    asteroid.update();
    asteroid.edges();
  });
}

function keyReleased() {
  ship.setRotation(0);
}
function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if ((keyCode = UP_ARROW)) {
    ship.boost();
  } else if ((keyCode = DOWN_ARROW)) {
    ship.boost();
  }
}
