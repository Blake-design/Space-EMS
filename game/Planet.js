function Planet(pos, r) {
  this.pos = createVector(width / 2, height / 2);
  this.r = 0;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);

  this.render = function () {
    push();
    fill('#e3d3a6');
    translate(this.pos.x, this.pos.y);
    circle(300, 0, 100);
    pop();
  };
}
