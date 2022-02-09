import AccentTypography from './accent-typography';

export default () => {

  const introTitle = new AccentTypography('.intro__title', {
      animationDelay: 100,
      stringsAnimationDelayOffset: 300,
      animationDuration: 500,
    });

  const introDate = new AccentTypography('.intro__date', {
      animationDelay: 1100,
      animationDuration: 400,
    });

  const sliderItemTitle = new AccentTypography('.slider__item-title', {
      animationDelay: 0,
      animationDuration: 400,
    });

  const prizesTitle = new AccentTypography('.prizes__title', {
      animationDelay: 0,
      animationDuration: 400,
    });

  const rulesTitle = new AccentTypography('.rules__title', {
      animationDelay: 0,
      animationDuration: 400,
    });

  const gameTitle = new AccentTypography('.game__title', {
      animationDelay: 0,
      animationDuration: 400,
    });
};
