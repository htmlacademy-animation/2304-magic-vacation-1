// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import page from './modules/page';
import initAccentTypography from './modules/init-accent-typography';
import initGameTimer from './modules/init-game-timer';
import prizes from './modules/prizes';

// init modules
page();
mobileHeight();
slider();
menu();
footer();
prizes();
chat();
result();
form();
social();
initAccentTypography();
initGameTimer();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
