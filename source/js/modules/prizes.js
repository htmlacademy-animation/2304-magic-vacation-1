import Prize from './prize';

export default () => {
  const prizes = [];

  document.querySelectorAll(`#prize1, #prize2, #prize3`)
    .forEach((node) => {
      prizes.push(
        new Prize({
          rootNode: node,
        })
      );
    });

  document.body.addEventListener('screenChanged', (event) => {
    if (event.detail.screenName === 'prizes') {
      const isPortraitOrientation = window.matchMedia('(orientation: portrait)').matches;
      const animationStep = isPortraitOrientation ? 500 : 2500;

      prizes.forEach((prize, index) => {
        prize.startAnimation(index * animationStep, isPortraitOrientation);
      });


    } else {
      prizes.forEach((prize, index) => {
        prize.resetAnimation();
      });
    }
  });
}
