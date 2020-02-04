function drawCircle(
  ctx,
  dotX,
  dotY,
  radius,
  options = {
    fillColor: undefined,
    edgingColor: undefined,
    edgingWidth: undefined,
  },
) {
  drawArc(
    ctx,
    dotX,
    dotY,
    radius,
    {
      ...options,
      startAngle: 0,
      endAngle: Math.PI * 2,
    },
  );
}

function drawArc(
  ctx,
  cx,
  cy,
  radius,
  options = {
    fillColor: undefined,
    edgingColor: undefined,
    edgingWidth: undefined,
    startAngle: undefined,
    endAngle: undefined,
  },
) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, options.startAngle, options.endAngle);

  if (options.fillColor) {
    ctx.fillStyle = options.fillColor;

    ctx.fill();
  }

  if (options.edgingWidth) {
    ctx.lineWidth = options.edgingWidth;
    ctx.strokeStyle = options.edgingColor || 'rgba(0, 0, 0, 0)';

    ctx.stroke();
  }
}

function drawLineToAngle(
  ctx,
  x1,
  y1,
  length,
  angle,
  options = {
    edgingColor: undefined,
    edgingWidth: undefined,
  },
) {
  const a = angle * Math.PI / 180;
  const x2 = x1 + length * Math.cos(a);
  const y2 = y1 + length * Math.sin(a);

  ctx.strokeStyle = options.edgingColor;
  ctx.lineWidth = options.edgingWidth;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  return [
    [x1, y1],
    [x2, y2],
  ];
}
