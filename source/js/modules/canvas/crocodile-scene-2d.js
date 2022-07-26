import Scene2d from './scene-2d.js';
import Easing from '../easing.js';
import Animation from '../animation.js';

export default class CrocodileScene2d extends Scene2d {
  static create(params) {
    const self = new CrocodileScene2d({
      canvas: params.canvas,
    });

    const imageList = [
      {
        id: 'keyhole',
        url: 'https://raw.githubusercontent.com/roman-stepanov/2304-magic-vacation-1/master/source/img/module-4/lose-images/key.png',
      },
      {
        id: 'crocodile',
        url: 'https://raw.githubusercontent.com/roman-stepanov/2304-magic-vacation-1/master/source/img/module-4/lose-images/crocodile.png',
      },
      {
        id: 'drop',
        url: 'https://raw.githubusercontent.com/roman-stepanov/2304-magic-vacation-1/master/source/img/module-4/lose-images/drop.png',
      },

      {
        id: 'flamingo',
        url: 'https://raw.githubusercontent.com/roman-stepanov/2304-magic-vacation-1/master/source/img/module-4/lose-images/flamingo.png',
      },
      {
        id: 'snowflake',
        url: 'https://raw.githubusercontent.com/roman-stepanov/2304-magic-vacation-1/master/source/img/module-4/lose-images/snowflake.png',
      },
      {
        id: 'leaf',
        url: 'https://raw.githubusercontent.com/roman-stepanov/2304-magic-vacation-1/master/source/img/module-4/lose-images/leaf.png',
      },
      {
        id: 'watermelon',
        url: 'https://raw.githubusercontent.com/roman-stepanov/2304-magic-vacation-1/master/source/img/module-4/lose-images/watermelon.png',
      },
      {
        id: 'saturn',
        url: 'https://raw.githubusercontent.com/roman-stepanov/2304-magic-vacation-1/master/source/img/module-4/lose-images/saturn.png',
      },
    ];

    const objectList = [
      {
        id: 'keyhole',
        object: {
          imageId: 'keyhole',
          size: 20,
          x: 50,
          y: 56,
          opacity: 1,
          transforms: {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
          },
          events: {
            onBeforeDraw: null,
            onAfterDraw: null,
          },
        },
      },
      {
        id: 'crocodile',
        object: {
          imageId: 'crocodile',
          size: 75,
          x: 51,
          y: 64,
          opacity: 1,
          transforms: {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
          },
          events: {
            onBeforeDraw: self.onBeforeDrawCrocodile.bind(self),
            onAfterDraw: self.onAfterDrawCrocodile.bind(self),
          },
        },
      },
      {
        id: 'drop',
        object: {
          imageId: 'drop',
          size: 4,
          x: 49,
          y: 68,
          opacity: 1,
          transforms: {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
          },
          events: {
            onBeforeDraw: null,
            onAfterDraw: null,
          },
        },
      },

      {
        id: 'flamingo',
        object: {
          imageId: 'flamingo',
          size: 20,
          x: 20,
          y: 52,
          opacity: 1,
          transforms: {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
          },
          events: {
            onBeforeDraw: null,
            onAfterDraw: null,
          },
        },
      },
      {
        id: 'snowflake',
        object: {
          imageId: 'snowflake',
          size: 16,
          x: 76,
          y: 59,
          opacity: 1,
          transforms: {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
          },
          events: {
            onBeforeDraw: null,
            onAfterDraw: null,
          },
        },
      },
      {
        id: 'leaf',
        object: {
          imageId: 'leaf',
          size: 18,
          x: 93,
          y: 45,
          opacity: 1,
          transforms: {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
          },
          events: {
            onBeforeDraw: null,
            onAfterDraw: null,
          },
        },
      },
      {
        id: 'watermelon',
        object: {
          imageId: 'watermelon',
          size: 15,
          x: 5,
          y: 75,
          opacity: 1,
          transforms: {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
          },
          events: {
            onBeforeDraw: null,
            onAfterDraw: null,
          },
        },
      },
      {
        id: 'saturn',
        object: {
          imageId: 'saturn',
          size: 15,
          x: 92,
          y: 80,
          opacity: 1,
          transforms: {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
          },
          events: {
            onBeforeDraw: null,
            onAfterDraw: null,
          },
        },
      },
    ];

    const animationList = [
      {
        id: 'zoomInKeyhole',
        animation: new Animation({
          duration: 200,
          delay: 0,
          easing: Easing.linear,
          progress: (progress, details) => {
            const keyhole = self.getObjectById(`keyhole`);

            keyhole.opacity = progress;
            keyhole.transforms.scaleX = (1 - 0.8) * progress + 0.8;
            keyhole.transforms.scaleY = (1 - 0.8) * progress + 0.8;
          }
        }),
      },
      {
        id: 'scatterObjects',
        animation: new Animation({
          duration: 600,
          delay: 200,
          easing: Easing.easeInOutSine,
          progress: (progress, details) => {
            const keyhole = self.getObjectById(`keyhole`);
            const flamingo = self.getObjectById(`flamingo`);
            const snowflake = self.getObjectById(`snowflake`);
            const leaf = self.getObjectById(`leaf`);
            const watermelon = self.getObjectById(`watermelon`);
            const saturn = self.getObjectById(`saturn`);

            flamingo.opacity = 1;
            flamingo.transforms.translateX = (keyhole.x - flamingo.x) * (1 - progress);
            flamingo.transforms.translateY = (keyhole.y - flamingo.y) * (1 - progress);
            flamingo.transforms.scaleX = (1 - 0.2) * progress + 0.2;
            flamingo.transforms.scaleY = (1 - 0.2) * progress + 0.2;

            snowflake.opacity = 1;
            snowflake.transforms.translateX = (keyhole.x - snowflake.x) * (1 - progress);
            snowflake.transforms.translateY = (keyhole.y - snowflake.y) * (1 - progress);
            snowflake.transforms.scaleX = (1 - 0.2) * progress + 0.2;
            snowflake.transforms.scaleY = (1 - 0.2) * progress + 0.2;

            leaf.opacity = 1;
            leaf.transforms.translateX = (keyhole.x - leaf.x) * (1 - progress);
            leaf.transforms.translateY = (keyhole.y - leaf.y) * (1 - progress);
            leaf.transforms.scaleX = (1 - 0.2) * progress + 0.2;
            leaf.transforms.scaleY = (1 - 0.2) * progress + 0.2;

            watermelon.opacity = 1;
            watermelon.transforms.translateX = (keyhole.x - watermelon.x) * (1 - progress);
            watermelon.transforms.translateY = (keyhole.y - watermelon.y) * (1 - progress);
            watermelon.transforms.scaleX = (1 - 0.2) * progress + 0.2;
            watermelon.transforms.scaleY = (1 - 0.2) * progress + 0.2;

            saturn.opacity = 1;
            saturn.transforms.translateX = (keyhole.x - saturn.x) * (1 - progress);
            saturn.transforms.translateY = (keyhole.y - saturn.y) * (1 - progress);
            saturn.transforms.scaleX = (1 - 0.2) * progress + 0.2;
            saturn.transforms.scaleY = (1 - 0.2) * progress + 0.2;
          }
        }),
      },

      {
        id: 'slideOutDownLeaf',
        animation: new Animation({
          duration: 800,
          delay: 1000,
          easing: Easing.easeInQuad,
          progress: (progress, details) => {
            const leaf = self.getObjectById(`leaf`);

            leaf.transforms.translateY = 100 * progress;
          }
        }),
      },
      {
        id: 'slideOutDownWatermelon',
        animation: new Animation({
          duration: 800,
          delay: 1050,
          easing: Easing.easeInQuad,
          progress: (progress, details) => {
            const watermelon = self.getObjectById(`watermelon`);

            watermelon.transforms.translateY = 100 * progress;
          }
        }),
      },
      {
        id: 'slideOutDownSaturn',
        animation: new Animation({
          duration: 800,
          delay: 1100,
          easing: Easing.easeInQuad,
          progress: (progress, details) => {
            const saturn = self.getObjectById(`saturn`);

            saturn.transforms.translateY = 100 * progress;
          }
        }),
      },
      {
        id: 'slideOutDownSnowflake',
        animation: new Animation({
          duration: 800,
          delay: 1150,
          easing: Easing.easeInQuad,
          progress: (progress, details) => {
            const snowflake = self.getObjectById(`snowflake`);

            snowflake.transforms.translateY = 100 * progress;
          }
        }),
      },
      {
        id: 'slideOutDownFlamingo',
        animation: new Animation({
          duration: 800,
          delay: 1200,
          easing: Easing.easeInQuad,
          progress: (progress, details) => {
            const flamingo = self.getObjectById(`flamingo`);

            flamingo.transforms.translateY = 100 * progress;
          }
        }),
      },
      {
        id: 'slideInRightCrocodile',
        animation: new Animation({
          duration: 800,
          delay: 800,
          easing: Easing.easeInQuad,
          progress: (progress, details) => {
            const keyhole = self.getObjectById(`keyhole`);
            const crocodile = self.getObjectById(`crocodile`);

            crocodile.opacity = 1;
            crocodile.transforms.translateX = 35 * (1 - progress);
            crocodile.transforms.translateY = -10 * (1 - progress);
          }
        }),
      },
      {
        id: 'fallingTear',
        animation: new Animation({
          duration: `infinite`,
          delay: 1800,
          easing: Easing.easeInQuad,
          progress: (progress, details) => {
            const drop = self.getObjectById(`drop`);

            const elapsedTime = (details.currentTime - details.startTime);
            const cycleDuration = 1500;
            const cycleProgress = (elapsedTime % cycleDuration) / cycleDuration;

            let cycleStepProgress;

            if (cycleProgress <= 0.3) {
              cycleStepProgress = cycleProgress / 0.3;

              drop.opacity = 1;
              drop.transforms.scaleX = (1 - 0.1) * cycleStepProgress + 0.1;
              drop.transforms.scaleY = (1 - 0.1) * cycleStepProgress + 0.1;
              drop.transforms.translateX = 0;
              drop.transforms.translateY = -3 * (1 - cycleStepProgress);
            }
            else if (cycleProgress <= 0.6) {
              cycleStepProgress = (cycleProgress - 0.3) / 0.3;

              drop.opacity = 1;
              drop.transforms.translateX = 0;
              drop.transforms.translateY += 0.15;
              drop.transforms.scaleX = 1;
              drop.transforms.scaleY = 1;
            }
            else if (cycleProgress <= 0.7) {
              cycleStepProgress = (cycleProgress - 0.6) / 0.1;

              drop.opacity = -(1 - 0.1) * cycleStepProgress + 1;
              drop.transforms.translateX = 0;
              drop.transforms.translateY += 0.1;
              drop.transforms.scaleX = -(1 - 0.1) * cycleStepProgress + 1;
              drop.transforms.scaleY = -(1 - 0.1) * cycleStepProgress + 1;
            }
            else {
              cycleStepProgress = (cycleProgress - 0.7) / 0.3;

              drop.opacity = 0;
              drop.transforms.translateX = 0;
              drop.transforms.translateY = 0;
              drop.transforms.scaleX = 0;
              drop.transforms.scaleY = 0;
            }
          }
        }),
      },
    ];

    self.loadSceneData({imageList, objectList, animationList});

    return self;
  }

  onBeforeDrawCrocodile(params) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);

    this.ctx.lineTo(
      this.canvas.width / 2,
      0
    );

    this.ctx.lineTo(
      this.canvas.width / 2,
      this.canvas.height * 0.39
    );

    this.ctx.arc(
      this.canvas.width / 2,
      this.canvas.height * 0.488,
      this.canvas.width * 0.099,
      (-90 * Math.PI) / 180,
      (45 * Math.PI) / 180
    );

    this.ctx.lineTo(
      this.canvas.width * 0.566,
      this.canvas.height * 0.56
    );

    this.ctx.lineTo(
      this.canvas.width * 0.60,
      this.canvas.height * 0.73
    );

    this.ctx.lineTo(
      this.canvas.width * 0.60,
      this.canvas.height
    );

    this.ctx.lineTo(
      0,
      this.canvas.height
    );

    this.ctx.closePath();
    this.ctx.clip();
  }

  onAfterDrawCrocodile(params) {
    this.ctx.restore();
  }

  onBeforeStart() {
    super.onBeforeStart();

    const keyhole = this.getObjectById(`keyhole`);
    const crocodile = this.getObjectById(`crocodile`);
    const drop = this.getObjectById(`drop`);
    const flamingo = this.getObjectById(`flamingo`);
    const snowflake = this.getObjectById(`snowflake`);
    const leaf = this.getObjectById('leaf');
    const watermelon = this.getObjectById('watermelon');
    const saturn = this.getObjectById(`saturn`);

    keyhole.opacity = 0;
    crocodile.opacity = 0;
    drop.opacity = 0;
    flamingo.opacity = 0;
    snowflake.opacity = 0;
    leaf.opacity = 0;
    watermelon.opacity = 0;
    saturn.opacity = 0;


    this.objectsDrawingOrder = [
      'keyhole',
      'crocodile',
      'drop',
      'flamingo',
      'snowflake',
      'leaf',
      'watermelon',
      'saturn',
    ];
  }
}
