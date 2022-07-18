export default class Easing {
  static linear(x) {
    return x;
  }

  static easeInQuad(x) {
    return x * x;
  }

  static easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;

    if (x === 0) {
      return 0;
    } else if (x === 1) {
      return 1;
    } else {
      return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }
  }
}
