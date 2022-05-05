import SmilAnimation from './smil-animation';
import CounterAnimation from './counter-animation';

export default class Prize {
  constructor({
    rootNode
  }) {
    this._rootNode = rootNode;
    this._svgIconNode = this._rootNode.querySelector('.prizes__icon > svg');
    this._counterNode = this._rootNode.querySelector('.prizes__desc > b');

    this._smilAnimation = new SmilAnimation({
      rootNode: this._svgIconNode,
      animationStartSelector: `#${this._rootNode.id}SmilAnimation`,
    });

    this._counterAnimation = new CounterAnimation({
      rootNode: this._counterNode,
      startValue: this._counterNode.dataset.startValue || 0,
      finalValue: this._counterNode.dataset.finalValue || 0,
    });
  }

  startAnimation(delay = 0, isPortraitOrientation = false) {
    setTimeout(
      () => {
        this._smilAnimation.start();
      },
      delay
    );

    const counterDelayOffset = isPortraitOrientation ? 300 : 1250;

    setTimeout(
      () => {
        this._counterAnimation.start();
      },
      delay + counterDelayOffset
    );
  }

  resetAnimation() {
    this._smilAnimation.reset();
    this._counterAnimation.reset();
  }
}
