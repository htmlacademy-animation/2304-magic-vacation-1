export default class CounterAnimation {
  constructor({
    rootNode,
    startValue = 0,
    finalValue = 0,
  }) {
    this._rootNode = rootNode;
    this._startValue = Number(startValue);
    this._finalValue = Number(finalValue);

    this._fps = 12;
    this._fpsInterval = 1000 / this._fps;
    this._step = Math.round((this._finalValue - this._startValue) / this._fps);

    this.reset();
  }

  updateLayout() {
    if (!this._rootNode) {
        return;
    }

    this._rootNode.innerHTML = `${this._currentValue.toString()}`;
  }

  draw() {
    if (this._currentValue >= this._finalValue) {
        this.stop();
        return;
    }

    this._requestId = requestAnimationFrame(this.draw.bind(this));

    let now = Date.now();
    let elapsed = now - this._drewLastTime;

    if (elapsed > this._fpsInterval) {
      this._drewLastTime = now - (elapsed % this._fpsInterval);
      this._currentValue += this._step;

      if (this._currentValue > this._finalValue) {
        this._currentValue = this._finalValue;
      }

      this.updateLayout();
    }
  }

  start() {
    if (this._requestId) {
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
    this._currentValue = this._startValue;
    this.updateLayout();
  }
}
