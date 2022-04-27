export default class GameTimer {
  constructor({
    rootNode,
    duration = 300000,
  }) {
    this._rootNode = rootNode;
    this._duration = duration;

    this._fps = 1;
    this._fpsInterval = 1000 / this._fps;
    this.reset();
  }

  updateLayout() {
    if (!this._rootNode) {
        return;
    }

    const minutes = (Math.floor((this._currentValue / 1000) / 60)).toString().padStart(2, '0');
    const seconds = (Math.floor((this._currentValue / 1000) % 60)).toString().padStart(2, '0');

    this._rootNode.innerHTML = `<span>${minutes}</span>:<span>${seconds}</span>`;
  }

  draw() {
    if (this._currentValue <= 0) {
        this.stop();
        return;
    }

    this._requestId = requestAnimationFrame(this.draw.bind(this));

    let now = Date.now();
    let elapsed = now - this._drewLastTime;

    if (elapsed > this._fpsInterval) {
        this._drewLastTime = now - (elapsed % this._fpsInterval);
        this._currentValue -= 1000;
        this.updateLayout();
    }
  }

  start() {
    if (this._requestId || this._currentValue == 0) {
      return;
    }

    this._drewLastTime = Date.now();
    this.draw();
  }

  stop() {
    if (!this._requestId) {
      return;
    }

    cancelAnimationFrame(this._requestId);
    this._requestId = null;
  }

  reset() {
    this.stop();
    this._currentValue = this._duration;
    this.updateLayout();
  }
}
