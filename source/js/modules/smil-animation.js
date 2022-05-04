export default class SmilAnimation {
  constructor({
      rootNode,
      animationStartSelector,
    }) {

    this._rootNode = rootNode;
    this._animationStartSelector = animationStartSelector;
  }

  reset() {
    if (!this._rootNode) {
      return;
    }

    this._rootNode.querySelectorAll(`animate, animateTransform, animateMotion`)
        .forEach((node) => {
          node.parentNode.replaceChild(
            node.cloneNode(),
            node
          );
        });
  }

  start() {
    if (!this._rootNode || !this._animationStartSelector) {
      return;
    }

    this.reset();

    const animationStart = this._rootNode.querySelector(this._animationStartSelector);

    if (animationStart) {
      animationStart.beginElement();
    }
  }

  static create(params) {
    return new SmilAnimation(params);
  }
};
