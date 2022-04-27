import GameTimer from './game-timer';

export default () => {

  const gameTimer = new GameTimer({
    rootNode: document.querySelector('#game-timer'),
    duration: 300000,
  });

  document.body.addEventListener('screenChanged', (event) => {
    if (event.detail.screenName === 'game') {
      gameTimer.start();
    } else {
      gameTimer.reset();
    }
  });
}
