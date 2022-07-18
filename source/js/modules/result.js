import SeaCalfScene2d from './canvas/sea-calf-scene-2d';
import SmilAnimation from './smil-animation';

export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);

  const seaCalfScene = SeaCalfScene2d.create({
    canvas: document.querySelector(`#sea-calf-scene`),
  });

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);

        switch(target) {
          case `result`:
            SmilAnimation.create({
              rootNode: targetEl[0].querySelector('#resultTitle1'),
              animationStartSelector: '#resultTitle1Animation',
            }).start();

            seaCalfScene.start();

            break;

          case `result2`:
            SmilAnimation.create({
              rootNode: targetEl[0].querySelector('#resultTitle2'),
              animationStartSelector: '#resultTitle2Animation',
            }).start();
            break;

          case `result3`:
            SmilAnimation.create({
              rootNode: targetEl[0].querySelector('#resultTitle3'),
              animationStartSelector: '#resultTitle3Animation',
            }).start();
            break;
        }
      });
    }

    let playBtn = document.querySelector(`.js-play`);

    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }

    document.body.addEventListener('screenChanged', (event) => {
      results.forEach(
        (el) => {
          if ( el.classList.contains('screen--show') ) {
            el.classList.remove(`screen--show`);
            el.classList.add(`screen--hidden`);
          }
        }
      );
    });
  }
};
