import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.transitionScreen = document.querySelector(`.transition-screen`);

    this.prevActiveScreen = 0;
    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.prevActiveScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    const showTransitionScreen = (this.screenElements[this.prevActiveScreen].id === 'story');

    if (showTransitionScreen) {
      this.transitionScreen.classList.add('show');
      setTimeout(() => {
        this.activateSelectedScreen();
        this.transitionScreen.classList.remove('show');
      }, 700);
    } else {
      this.activateSelectedScreen();
    }
  }

  activateSelectedScreen() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });

    this.prepareFootnote();

    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, 100);
  }

  prepareFootnote() {
    const activeScreenFootnote = this.screenElements[this.activeScreen].querySelector(`.footnote`);
    const prevActiveScreenFootnote = this.screenElements[this.prevActiveScreen].querySelector(`.footnote`);

    if (!activeScreenFootnote && !prevActiveScreenFootnote) {
      return false;
    }

    if (!activeScreenFootnote) {
      prevActiveScreenFootnote.classList.remove(`footnote--show`);
      return false;
    }

    if (prevActiveScreenFootnote && prevActiveScreenFootnote.classList.contains(`footnote--show`)) {
      activeScreenFootnote.classList.add(`footnote--show`);
      activeScreenFootnote.classList.add(`footnote--fade-in`);

      setTimeout(() => {
        activeScreenFootnote.classList.remove(`footnote--fade-in`);
      }, 1000);

    } else {
      activeScreenFootnote.classList.add(`footnote--slide-in-up`);

      setTimeout(() => {
        activeScreenFootnote.classList.add(`footnote--show`);
        activeScreenFootnote.classList.remove(`footnote--slide-in-up`);
      }, 1000);

    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
