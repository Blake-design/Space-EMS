function Hud() {
  this.render = function () {
    renderScore();
  };

  function renderScore() {
    if (localStorage.getItem('highscore') == null) {
      localStorage.setItem('highscore', 0);
    }

    if (score >= parseInt(localStorage.getItem('highscore'))) {
      localStorage.setItem('highscore', score);
    }
    var hiScore = localStorage.getItem('highscore');
    textSize(32);
    fill(247, 241, 62);
    text('Score:', 10, 30);

    textSize(32);
    fill(247, 241, 62);
    text(score, 200, 30);

    textSize(32);
    fill(242, 240, 240);
    text('Hi-Score:', 10, 100);

    textSize(32);
    fill(242, 240, 240);
    text(hiScore, 200, 100);

    textSize(32);
    fill(242, 240, 240);
    text('Level:' + level, 900, 30);
  }
}
