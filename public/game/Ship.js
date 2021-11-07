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

  this.brokenParts = [];

  this.explode = function () {
    for (var i = 0; i < 4; i++)
      this.brokenParts[i] = {
        pos: this.pos.copy(),
        vel: p5.Vector.random2D(),
        heading: random(0, 360),
        rot: random(-0.07, 0.07),
      };

    for (var i = 0; i < this.brokenParts.length; i++) {
      push();
      stroke(floor(255 * (this.destroyFrames-- / 600)));
      var bp = this.brokenParts[i];
      translate(bp.pos.x, bp.pos.y);
      rotate(bp.heading);
      line(-this.r / 2, -this.r / 2, this.r / 2, this.r / 2);
      pop();
    }
  };
}
