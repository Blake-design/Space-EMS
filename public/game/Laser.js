function Laser(spos, angle) {
  // spos stands for ship posiiton ///
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(5);
  this.update = function () {
    this.pos.add(this.vel);
  };
  this.render = function () {
    push();
    stroke(255);
    strokeWeight(8);
    point(this.pos.x, this.pos.y);
    pop();
  };
  this.hits = function (asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    }
  };

  this.offscreen = function () {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }

    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  };
}
