import Scene2d from './scene-2d.js';
import Easing from '../easing.js';
import Animation from '../animation.js';

export default class SeaCalfScene2d extends Scene2d {
  static create(params) {
    const self = new SeaCalfScene2d({
      canvas: params.canvas,
    });

    const imageList = [
      {
        id: 'airplane',
        url: '../img/module-4/win-primary-images/airplane.png',
      },
      {
        id: 'bigTree',
        url: '../img/module-4/win-primary-images/tree%202.png',
      },
      {
        id: 'smallTree',
        url: '../img/module-4/win-primary-images/tree.png',
      },
      {
        id: 'ice',
        url: '../img/module-4/win-primary-images/ice.png',
      },
      {
        id: 'seaCalf',
        url: '../img/module-4/win-primary-images/sea-calf-2.png',
      },
      {
        id: 'snowflake',
        url: '../img/module-4/win-primary-images/snowflake.png',
      },
    ];

    const objectList = [
      {
        id: 'airplane',
        object: {
          imageId: 'airplane',
          size: 10,
          x: 95,
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
            onBeforeDraw: self.onBeforeDrawAirplane.bind(self),
            onAfterDraw: null,
          },
        },
      },
      {
        id: 'bigTree',
        object: {
          imageId: 'bigTree',
          size: 5,
          x: 63,
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
        id: 'smallTree',
        object: {
          imageId: 'smallTree',
          size: 4,
          x: 67,
          y: 60,
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
        id: 'ice',
        object: {
          imageId: 'ice',
          size: 55,
          x: 50,
          y: 70,
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
        id: 'seaCalf',
        object: {
          imageId: 'seaCalf',
          size: 65,
          x: 50,
          y: 60,
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
        id: 'bigSnowflake',
        object: {
          imageId: 'snowflake',
          size: 25,
          x: 20,
          y: 57,
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
        id: 'smallSnowflake',
        object: {
          imageId: 'snowflake',
          size: 15,
          x: 78,
          y: 65,
          opacity: 1,
          transforms: {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotate: 180,
          },
          events: {
            onBeforeDraw: null,
            onAfterDraw: null,
          },
        },
      },

      {
        id: 'blob',
        object: {
          color: `#acc3ff`,
          centerX: 35,
          centerY: 57,
          radius: 18,
          endX: 90,
          endY: 52,
          angle: 40,
          deltasLength: 10,
          opacity: 1,
          events: {
            onBeforeDraw: null,
            onDraw: self.onDrawBlob.bind(self),
            onAfterDraw: null,
          },
        },
      },
    ];

    const animationList = [
      {
        id: 'airplaneFlight',
        animation: new Animation({
          duration: 600,
          delay: 400,
          easing: Easing.easeInQuad,
          progress: (progress, details) => {
            const airplane = self.getObjectById(`airplane`);
            const blob = self.getObjectById(`blob`);
            const progressReversed = 1 - progress;

            airplane.transforms.translateX = -35 * progressReversed;
            airplane.transforms.translateY = 5 * Math.sin(Math.PI * progressReversed) - 15 * progressReversed;
            airplane.transforms.rotate = 45 * Math.sin(Math.PI * progressReversed) + 45 * progressReversed;
            airplane.opacity = progress;

            blob.centerY = 57 - 15 * progressReversed;
            blob.radius = 18 * progress;
            blob.endX = (airplane.x + airplane.transforms.translateX);
            blob.endY = (airplane.y + airplane.transforms.translateY);
            blob.angle = 40 + 120 * progressReversed;
            blob.deltasLength = 10 * progress;
            blob.opacity = progress;
          }
        }),
      },

      {
        id: 'showBigTree',
        animation: new Animation({
          duration: 500,
          delay: 700,
          easing: Easing.easeInQuad,
          progress: (progress, details) => {
            const bigTree = self.getObjectById(`bigTree`);

            bigTree.transforms.translateY = 30 * (1 - progress);
            bigTree.opacity = progress;
          }
        }),
      },
      {
        id: 'showSmallTree',
        animation: new Animation({
          duration: 500,
          delay: 400,
          easing: Easing.easeInQuad,
          progress: (progress, details) => {
            const smallTree = self.getObjectById(`smallTree`);

            smallTree.opacity = progress;
          }
        }),
      },

      {
        id: 'showSeaCalf',
        animation: new Animation({
          duration: 2000,
          delay: 300,
          easing: Easing.easeOutElastic,
          progress: (progress, details) => {
            const ice = self.getObjectById(`ice`);
            const seaCalf = self.getObjectById(`seaCalf`);

            const progressReversed = 1 - progress;

            ice.transforms.translateY = 30 * progressReversed;
            ice.transforms.rotate = -30 * Math.sin(progressReversed * 2);
            ice.opacity = progress

            seaCalf.transforms.translateY = 30 * progressReversed;
            seaCalf.transforms.rotate = -30 * Math.sin(progressReversed * 2);
            seaCalf.opacity = progress;
          }
        }),
      },

      {
        id: 'upDownBigSnowflake',
        animation: new Animation({
          duration: `infinite`,
          delay: 0,
          easing: Easing.linear,
          progress: (progress, details) => {
            const bigSnowflake = self.getObjectById(`bigSnowflake`);

            bigSnowflake.transforms.translateY = 2 * Math.sin((1.5 * (details.currentTime - details.startTime)) /1000);
          }
        }),
      },

      {
        id: 'upDownSmallSnowflake',
        animation: new Animation({
          duration: `infinite`,
          delay: 800,
          easing: Easing.linear,
          progress: (progress, details) => {
            const smallSnowflake = self.getObjectById(`smallSnowflake`);

            smallSnowflake.transforms.translateY = 2 * Math.sin((1.5 * (details.currentTime - details.startTime)) /1000);
          }
        }),
      },

      {
        id: 'showBigSnowflake',
        animation: new Animation({
          duration: 500,
          delay: 700,
          easing: Easing.linear,
          progress: (progress, details) => {
            const bigSnowflake = self.getObjectById(`bigSnowflake`);

            bigSnowflake.opacity = progress;
          }
        }),
      },

      {
        id: 'showSmallSnowflake',
        animation: new Animation({
          duration: 500,
          delay: 800,
          easing: Easing.linear,
          progress: (progress, details) => {
            const smallSnowflake = self.getObjectById(`smallSnowflake`);

            smallSnowflake.opacity = progress;
          }
        }),
      },
    ];

    self.loadSceneData({imageList, objectList, animationList});

    return self;
  }

  onBeforeDrawAirplane(params) {
    this.drawObject('blob');
  }

  onDrawBlob(params) {
    if (params.opacity === 0) {
      return;
    }

    const s = this.canvas.width / 100;

    const centerX = this.canvas.width * (params.centerX / 100);
    const centerY = this.canvas.height * (params.centerY / 100);
    const radius = this.canvas.width * (params.radius / 100);
    const endX = this.canvas.width * (params.endX / 100);
    const endY = this.canvas.height * (params.endY / 100);

    const angle = params.angle * Math.PI / 180;
    const deltasLength = this.canvas.width * (params.deltasLength / 100);

    this.ctx.save();
    this.ctx.globalAlpha = params.opacity;
    this.ctx.fillStyle = params.color;

    this.ctx.beginPath();

    this.ctx.arc(
      centerX,
      centerY,
      radius,
      (90 * Math.PI) / 180,
      (270 * Math.PI) / 180
    );

    this.ctx.bezierCurveTo(
      (centerX + 100),
      (centerY - radius),
      (endX - deltasLength * Math.sin(angle)),
      (endY + deltasLength * Math.cos(angle)),
      endX,
      endY
    );

    this.ctx.bezierCurveTo(
      (endX - deltasLength * Math.sin(angle)),
      (endY + deltasLength * Math.cos(angle)),
      (centerX + 100),
      (centerY + radius),
      centerX,
      (centerY + radius)
    );

    this.ctx.fill();
    this.ctx.restore();
  }

  onBeforeStart() {
    super.onBeforeStart();

    const airplane = this.getObjectById(`airplane`);
    const blob = this.getObjectById(`blob`);
    const bigTree = this.getObjectById('bigTree');
    const smallTree = this.getObjectById('smallTree');
    const ice = this.getObjectById(`ice`);
    const seaCalf = this.getObjectById(`seaCalf`);
    const bigSnowflake = this.getObjectById(`bigSnowflake`);
    const smallSnowflake = this.getObjectById(`smallSnowflake`);

    airplane.opacity = 0;
    blob.opacity = 0;

    bigTree.opacity = 0;
    smallTree.opacity = 0;

    ice.transforms.translateY = 30;
    ice.opacity = 0;

    seaCalf.transforms.translateY = 30;
    seaCalf.opacity = 0;

    bigSnowflake.opacity = 0;

    smallSnowflake.opacity = 0;
    smallSnowflake.transforms.rotate = 180;

    this.objectsDrawingOrder = [
      'airplane',
      'bigTree',
      'smallTree',
      'ice',
      'seaCalf',
      'bigSnowflake',
      'smallSnowflake',
    ];
  }
}
