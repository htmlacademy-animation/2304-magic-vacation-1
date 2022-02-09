export default class AccentTypography {
  constructor(
      selector, {
        animationDelay = 0,
        stringsAnimationDelayOffset = 300,
        animationDuration = 400,
      }
    ) {

    this._selector = selector;
    this._elementNode = document.querySelector(this._selector);

    this._animationDelay = animationDelay;
    this._stringsAnimationDelayOffset = stringsAnimationDelayOffset;
    this._animationDuration = animationDuration;

    this.prepareElementNode();
  }

  prepareElementNode() {
    if (!this._elementNode) {
      return;
    }

    const strings = this._elementNode.innerHTML.trim().split('<br>');

    this._elementNode.classList.add('accent-typography');
    this._elementNode.innerHTML = '';

    strings.forEach(
      (string, stringIndex, stringArray) => {
        const stringElement = document.createElement('span');

        stringElement.classList.add('accent-typography__string');

        [...string].forEach(
          (character, characterIndex, characterArray) => {
            const characterElement = document.createElement('span');

            characterElement.classList.add('accent-typography__character');
            characterElement.textContent = character;

            if (character !== ' ') {
              const animationDelay = this._animationDelay
                + (stringIndex * this._stringsAnimationDelayOffset)
                + Math.floor(Math.random() * (this._animationDuration - characterArray.length) );

              characterElement.style.animationDelay = animationDelay + 'ms';
              characterElement.style.animationDuration = this._animationDuration + 'ms';
            } else {
              characterElement.classList.add('accent-typography__character--space');
            }

            stringElement.appendChild(characterElement);
          }
        );

        this._elementNode.appendChild(stringElement);
      }
    );
  }

};
