var input = {
  listeners: {},
  reset: function () {
    this.listeners;
  },

  registerAsListener: function (index, callback) {
    if (this.listeners[index] == undefined) {
      this.listeners[index] = [];
    }
  },

  handleEvent: function (char, code, press) {
    if (this.listeners[code] != undefined) {
      for (i = 0; i < this.listeners[code].length; i++) {
        this.listeners[code][i](char, code, press);
      }
    }
  },
};

function keyReleased() {
  input.handleEvent(key, keyCode, false);
}

function keyPressed() {
  input.handleEvent(key, keyCode, true);
}
