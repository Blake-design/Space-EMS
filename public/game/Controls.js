function keyReleased() {
  ship.setRotation(0);
}
function keyPressed(event) {
  event.preventDefault();
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boost();
  } else if (keyCode === DOWN_ARROW) {
    ship.reverse();
  }
}
