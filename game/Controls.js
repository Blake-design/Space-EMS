function keyReleased() {
  ship.setRotation(0);
  ship.boosting = false;
}
function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
  } else if (keyCode == LEFT_ARROW) {
  } else if ((keyCode = UP_ARROW)) {
  } else if ((keyCode = DOWN_ARROW)) {
  }
}
