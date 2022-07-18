import Easing from './easing.js';

export default class Animation {
  constructor({
    fps = 60,
    duration = 1000,
    delay = 0,
    easing = Easing.linear,
    progress
  }) {
    this.timeoutId = null;
    this.requestId = null;

    this.fps = fps;
    this.duration = duration;
    this.delay = delay;
    this.easing = easing;
    this.progress = progress;
  }

  animateFrame(currentTime) {
    this.requestId = requestAnimationFrame(this.animateFrame.bind(this));

    const delta = currentTime - this.lastFrameTime;

    if (delta > this.interval) {
      let timeFraction;

      if (this.duration === `infinite`) {
        timeFraction = 1;
        this.isFinished = false;
      } else {
        timeFraction = (currentTime - this.startTime) / this.duration;

        if (timeFraction > 1) {
          timeFraction = 1;
        }

        this.isFinished = timeFraction === 1;
      }

      if (timeFraction <= 1) {
        const progress = this.easing(timeFraction);

        this.progress(progress, {
          startTime: this.startTime,
          currentTime: currentTime,
          isFinished: this.isFinished
        });

        this.lastFrameTime = currentTime - (delta % this.interval);
      }

      if (this.isFinished) {
        this.stop();
      }
    }
  }

  start() {
    this.stop();

    this.timeoutId = setTimeout(() => {
      this.startTime = performance.now();
      this.interval = 1000 / this.fps;
      this.lastFrameTime = this.startTime;

      this.animateFrame(performance.now());
    }, this.delay);
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }
}
