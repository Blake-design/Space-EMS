function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 0;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.boosting = false;

  this.update = function () {
    this.pos.add(this.vel);
  };

  this.boost = function () {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.5);
    this.vel.add(force);
  };

  this.setRotation = function (angle) {
    this.rotation = -angle;
  };

  this.turn = function () {
    this.heading -= this.rotation;
  };

  this.hits = function (asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    }
  };
  this.render = function () {
    push();
    noStroke();
    const colors = ['#d9bbb8', '#de6357'];
    // // for (i = 0; i < colors.length; i++) {
    // //   color = color[i];
    // // }
    // fill(this.color);
    triangle(
      this.pos.x,
      this.pos.y + 10,
      this.pos.x,
      this.pos.y - 10,
      this.pos.x - 30,
      this.pos.y
    );

    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    image(spaceship, 15, 10, -30, -30);

    pop();
  };
  this.edges = function () {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    } else if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  };
}
