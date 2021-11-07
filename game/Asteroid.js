function Asteroid(pos, r, size) {
  if (pos == null) {
    this.pos = createVector(random(width), random(height));
  }

  if (r) {
    this.r = r * 0.5;
  } else {
    this.r = random(15, 50);
  }

  Entity.call(this.pos.x, this.pos.y, this.r);

  this.vel = p5.Vector.random2D();

  this.total = floor(random(5, 15));

  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.2, this.r * 0.5);
  }

  //calculate minimun and maximum raddi squared
  this.rmin = this.r + min(this.offset);
  this.rmin2 = this.rmin * this.rmin;
  this.rmax = this.r + max(this.offset);
  this.rmax2 = this.r * this.rmax;

  Entity.prototype.setRotation.call(this, random(-0.03, 0.03));

  this.render = function () {
    push();
    fill('#535C62');
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      vertex(r * cos(angle), r * sin(angle));
    }
    endShape(CLOSE);
    pop();
  };

  this.breakup = function () {
    if (size > 0)
      return [
        new Asteroid(this.pos, this.r, this.size - 1),
        new Asteroid(this.pos, this.r, this.size - 1),
      ];
    else return [];
  };

  this.vertice = function () {
    var vertices = [];
    for (var i = 0; i < this.total; i++) {
      var angle = this.heading + map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var vec = createVector(r * cos(angle), r * sin(angle));
      vertices.push(p5.Vector.add(vec, this.pos));
    }
    return vertices;
  };
}

//// this will connect objects together
Asteroid.prototype = Object.create(Entity.prototype);
