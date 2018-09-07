'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 10;
var GAP = 10;

// функция для отрисовки облаков
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)'); // тень
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); // само облако

  // оповещение
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура! Вы победили!', 130, 30);
  ctx.fillText('Список результатов:', 130, 48);

  var max = times[0];
  var histogramHeight = 150;
  var histogramWidth = 40;
  var startX = 155;
  var startY = 250;
  var indent = 90;

  var getRandom = function () {
    return Math.random();
  };

  for (var j = 0; j < times.length; j++) {
    if (times[j] > max) {
      max = times[j];
    }
  }

  var step = histogramHeight / max;

  for (var i = 0; i < times.length; i++) {

    ctx.fillStyle = 'rgba(0, 0, 255,' + getRandom() + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillRect(startX + indent * i, startY, histogramWidth, -(times[i] * step));
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], startX + indent * i, startY + 10);
    ctx.fillText(Math.round(times[i]), startX + indent * i, 230 - (times[i] * step));
  }

};
