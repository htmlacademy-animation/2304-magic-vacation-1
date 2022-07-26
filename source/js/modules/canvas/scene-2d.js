import Easing from '../easing.js';
import Animation from '../animation.js';

export default class Scene2d {
  constructor({canvas}) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext(`2d`);

    this.images = new Map();
    this.objects = new Map();
    this.animations = new Map([
      [
        'drawScene',
        new Animation({
          fps: 60,
          duration: `infinite`,
          delay: 0,
          easing: Easing.linear,
          progress: (progress, progressDetails) => {
            this.drawScene();
          }
        }),
      ]
    ]);

    this.objectsDrawingOrder = [];

    this.isLoaded = false;
    this.isStarted = false;

    window.addEventListener(`resize`, this.updateSceneSize.bind(this));
  }

  getImages() {
    return this.images;
  }

  getImageById(imageId) {
    return this.images.get(imageId);
  }

  clearImages() {
    if (this.isStarted) {
      this.stop();
    }

    this.images.clear();
  }

  addImage({id, url}) {
    return new Promise(
      (resolve, reject) => {
        const image = new Image();

        image.addEventListener(`load`, (event) => {
          this.images.set(id, image);
          resolve();
        });

        image.addEventListener(`error`, (event) => {
          reject(`Failed to load image: ${url}`);
        });

        image.src = url;
      }
    );
  }

  addImages(imageList = []) {
    return new Promise(
      (resolve, reject) => {
        if (!Array.isArray(imageList)) {
          reject(`Images list must be array`);
        } else {
          this.clearImages();

          if (!imageList.length) {
            resolve();
          } else {
            let loadingCounter = 0;

            imageList.forEach(
              (imageInfo) => {
                this.addImage(imageInfo)
                  .then(
                    (response) => {
                      loadingCounter++;

                      if (loadingCounter === imageList.length) {
                        resolve();
                      }
                    },
                    (response) => {
                      reject(response);
                    }
                  );
              }
            );
          }
        }
      }
    );
  }


  getObjects() {
    return this.objects;
  }

  getObjectById(objectId) {
    return this.objects.get(objectId);
  }

  clearObjects() {
    if (this.isStarted) {
      this.stop();
    }

    this.objects.clear();
  }

  addObject({id, object}) {
    this.objects.set(id, object);
  }

  addObjects(objectList = []) {
    return new Promise(
      (resolve, reject) => {
        if (!Array.isArray(objectList)) {
          reject(`Object list must be array`);
        } else {
          this.clearObjects();

          if (!objectList.length) {
            resolve();
          } else {
            let loadingCounter = 0;

            objectList.forEach(
              (objectInfo) => {
                this.addObject(objectInfo);

                loadingCounter++;

                if (loadingCounter === objectList.length) {
                  resolve();
                }
              }
            );
          }
        }
      }
    );
  }


  getAnimations() {
    return this.animations;
  }

  getAnimationById(animationId) {
    return this.animations.get(animationId);
  }

  clearAnimations() {
    if (this.isStarted) {
      this.stop();
    }

    this.animations.forEach(
      (animation, id) => {
        if (id === 'drawScene') {
          return;
        }

        this.animations.delete(id);
      }
    );
  }

  addAnimation({id, animation}) {
    this.animations.set(id, animation);
  }

  addAnimations(animationList = []) {
    return new Promise(
      (resolve, reject) => {
        if (!Array.isArray(animationList)) {
          reject(`Animation list must be array`);
        } else {
          this.clearAnimations();

          if (!animationList.length) {
            resolve();
          } else {
            let loadingCounter = 0;

            animationList.forEach(
              (animationInfo) => {
                this.addAnimation(animationInfo);

                loadingCounter++;

                if (loadingCounter === animationList.length) {
                  resolve();
                }
              }
            );
          }
        }
      }
    );
  }


  loadSceneData({
    imageList = [],
    objectList = [],
    animationList = []
  }) {
    return new Promise(
      (resolve, reject) => {
        this.isLoaded = false;

        this.addImages(imageList)
          .then(
            () => this.addObjects(objectList)
          )
          .then(
            () => this.addAnimations(animationList)
          )
          .then(
            () => {
              this.isLoaded = true;
              resolve();
            }
          )
          .catch(
            (error) => {
              reject(error);
            }
          );
      }
    );
  }


  drawImage(params) {
    const image = this.getImageById(params.imageId);

    if (!image) {
      return;
    }

    if (params.opacity === 0) {
      return;
    }

    let width = this.canvas.width * (params.size / 100);
    let height = (this.canvas.width * (params.size / 100) * image.height) / image.width;

    let x = this.canvas.width * (params.x / 100) - width / 2;
    let y = this.canvas.height * (params.y / 100) - height / 2;

    const isContextTransforming = (params.opacity || params.transforms);

    if (isContextTransforming) {
      this.ctx.save();
    }

    if (params.transforms) {
      if ('translateX' in params.transforms) {
        x += this.canvas.width * (params.transforms.translateX / 100);
      }

      if ('translateY' in params.transforms) {
        y += this.canvas.height * (params.transforms.translateY / 100);
      }

      if ('rotate' in params.transforms) {
        this.ctx.translate(x + width / 2, y + height / 2);
        this.ctx.rotate((params.transforms.rotate * Math.PI) / 180);
      }

      if ('scaleX' in params.transforms) {
        width *= params.transforms.scaleX;

        if (params.transforms.scaleX < 0) {
          this.ctx.scale(-1, 1);

          x = -x;
        }
      }

      if ('scaleY' in params.transforms) {
        height *= params.transforms.scaleY;

        if (params.transforms.scaleY < 0) {
          this.ctx.scale(1, -1);

          y = -y;
        }
      }

      if ('rotate' in params.transforms) {
        this.ctx.translate(-x - width / 2, -y - height / 2);
      }
    }

    if (params.opacity) {
      this.ctx.globalAlpha = params.opacity;
    }

    this.ctx.drawImage(image, x, y, width, height);

    if (isContextTransforming) {
      this.ctx.restore();
    }
  }

  drawObject(objectId) {
    const object = this.objects.get(objectId);

    if (!object) {
      return false;
    }

    if (object.events.onBeforeDraw && typeof object.events.onBeforeDraw === `function`) {
      object.events.onBeforeDraw(object);
    }

    if (object.events.onDraw && typeof object.events.onDraw === `function`) {
      object.events.onDraw(object);
    } else if (object.imageId) {
      this.drawImage(object);
    }

    if (object.events.onAfterDraw && typeof object.events.onAfterDraw === `function`) {
      object.events.onAfterDraw(object);
    }
  }

  updateSceneSize() {
    const size = Math.min(window.innerWidth, window.innerHeight);

    this.canvas.width = size;
    this.canvas.height = size;
  }

  clearScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawScene() {
    this.clearScene();

    this.objectsDrawingOrder.forEach(
      (objectId) => {
        this.drawObject(objectId);
      }
    );
  }

  start() {
    this.onBeforeStart();

    this.animations.forEach((animation) => {
      animation.start();
    });

    this.isStarted = true;
  }

  stop() {
    if (!this.isStarted) {
      return;
    }

    this.animations.forEach((animation) => {
      animation.stop();
    });

    this.isStarted = false;
  }

  onBeforeStart() {
    if (this.isStarted) {
      this.stop();
    }

    this.updateSceneSize();
  }
}
