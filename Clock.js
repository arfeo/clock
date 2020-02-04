const BLACK_COLOR = 'rgb(0, 0, 0)';
const RED_COLOR = 'rgb(255, 0, 0)';

class Clock {
  constructor() {
    this.canvasSize = Clock.getCanvasVminSize(90);
    this.faceCanvas = document.createElement('canvas');
    this.handsCanvas = document.createElement('canvas');
  }

  static getCanvasVminSize(size) {
    const vpWidth = window.innerWidth;
    const vpHeight = window.innerHeight;
    const vMin = vpWidth >= vpHeight ? (vpHeight / 100) : (vpWidth / 100);

    return Math.round(vMin * size  / 10) * 10;
  }

  render() {
    const root = document.getElementById('root');
    const container = document.createElement('div');

    container.className = 'container';

    this.faceCanvas.width = this.handsCanvas.width = this.canvasSize;
    this.faceCanvas.height = this.handsCanvas.height = this.canvasSize;

    this.faceCanvas.className = 'face-canvas';
    this.handsCanvas.className = 'hands-canvas';

    root.appendChild(container);
    container.appendChild(this.faceCanvas);
    container.appendChild(this.handsCanvas);

    this.renderFace();
    this.renderHands();
  }

  renderFace() {
    const ctx = this.faceCanvas.getContext('2d');
    const edgingWidth = this.canvasSize / 100;

    ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

    ctx.font = '700 5vmin Helvetica, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = BLACK_COLOR;

    drawCircle(
      ctx,
      this.canvasSize / 2,
      this.canvasSize / 2,
      this.canvasSize / 2 - this.canvasSize / 100,
      {
        edgingColor: BLACK_COLOR,
        edgingWidth,
      }
    );

    // Render minutes
    for (let i = 0; i < 60; i += 1) {
      if (i % 5 === 0) {
        continue;
      }

      drawLineToAngle(
        ctx,
        this.canvasSize / 2 + (this.canvasSize / 2 - this.canvasSize / 15) * Math.cos(Math.PI * i / 30),
        this.canvasSize / 2 + (this.canvasSize / 2 - this.canvasSize / 15) * Math.sin(Math.PI * i / 30),
        this.canvasSize / 30,
        i * 6,
        {
          edgingColor: BLACK_COLOR,
          edgingWidth,
        }
      );
    }

    // Render five minutes stokes and numbers
    for (let i = 0; i < 12; i += 1) {
      const strokeRotateAngle = Math.PI * i / 6;
      const strokeOuterRadius = this.canvasSize / 2 - this.canvasSize / 10;
      const textRotateAngle = Math.PI * (270 + i * 30) / 180;
      const textOuterRadius = this.canvasSize / 2 - this.canvasSize / 7;

      drawLineToAngle(
        ctx,
        this.canvasSize / 2 + strokeOuterRadius * Math.cos(strokeRotateAngle),
        this.canvasSize / 2 + strokeOuterRadius * Math.sin(strokeRotateAngle),
        this.canvasSize / 15,
        i * 30,
        {
          edgingColor: BLACK_COLOR,
          edgingWidth: edgingWidth * 1.6,
        }
      );

      ctx.fillText(
        i === 0 ? '12' : i.toString(),
        this.canvasSize / 2 + textOuterRadius * Math.cos(textRotateAngle),
        this.canvasSize / 2 + textOuterRadius * Math.sin(textRotateAngle),
      );
    }
  }

  renderHands() {
    const ctx = this.handsCanvas.getContext('2d');
    const currentDate = new Date();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();

    ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

    drawLineToAngle(
      ctx,
      this.canvasSize / 2,
      this.canvasSize / 2,
      this.canvasSize / 2 - this.canvasSize / 3.5,
      270 + hour * 30 + Math.floor(minute / 10) * 6,
      {
        edgingColor: BLACK_COLOR,
        edgingWidth: this.canvasSize / 70,
      }
    );

    drawLineToAngle(
      ctx,
      this.canvasSize / 2,
      this.canvasSize / 2,
      this.canvasSize / 2 - this.canvasSize / 5.5,
      270 + minute * 6,
      {
        edgingColor: BLACK_COLOR,
        edgingWidth: this.canvasSize / 100,
      }
    );

    drawLineToAngle(
      ctx,
      this.canvasSize / 2,
      this.canvasSize / 2,
      this.canvasSize / 2 - this.canvasSize / 8,
      270 + second * 6,
      {
        edgingColor: RED_COLOR,
        edgingWidth: this.canvasSize / 200,
      }
    );

    drawCircle(
      ctx,
      this.canvasSize / 2,
      this.canvasSize / 2,
      this.canvasSize / 50,
      {
        fillColor: BLACK_COLOR,
      }
    );
  }

  animateHands() {
    let start = performance.now();

    const animate = (time) => {
      if (time - start >= 1000) {
        this.renderHands();

        start = time;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}
