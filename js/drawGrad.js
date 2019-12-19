var BORDER = 2;
var gridNum = 3;
var CANVAS_ID = "draw_grad";

var sX, sY, eX, eY;
var canvasWidth;
var canvasHeight;

var isInit = false;
var canvas = null;

function init() {
  if (document.getElementById(CANVAS_ID)) {
    return;
  }

  div = document.getElementById("0_0");
  canvas = document.createElement("canvas");
  div.appendChild(canvas);

  pic = document.getElementsByClassName("cornerstone-canvas")[0];
  canvasWidth = canvas.width = pic.width;
  canvasHeight = canvas.height = pic.height;
  canvas.id = CANVAS_ID;
  canvas.style = "position: absolute; top:0; left:0";

  startDraw();
}

function clean() {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
}

function addGrid() {
  gridNum++;
  clean();
  drawYellowGrid();
}

function decGrid() {
  gridNum = gridNum > 2 ? gridNum - 1 : gridNum;
  clean();
  drawYellowGrid();
}

/**
 * 鼠标弹起生成黄色网格
 */
function drawYellowGrid() {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "yellow";

  var w = (eX - sX) / gridNum;
  var h = (eY - sY) / gridNum;

  for (var i = 0; i <= gridNum; i++) {
    ctx.fillRect(sX + (w * i), sY, BORDER, eY - sY + 1);
    ctx.fillRect(sX, sY + (h * i), eX - sX + 1, BORDER);
  }
}

/**
 * 移动鼠标绘制绿色网格
 */
function drawGreenGrid() {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "#00AA00";
  ctx.strokeStyle = "#00AA00";

  ctx.beginPath();
  ctx.arc(eX, eY, 8, 0, Math.PI * 2, true);
  ctx.arc(eX, eY, 7, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.closePath();

  var w = (eX - sX) / gridNum;
  var h = (eY - sY) / gridNum;

  for (var i = 0; i <= gridNum; i++) {
    ctx.fillRect(sX + (w * i), sY, BORDER, eY - sY + 1);
    ctx.fillRect(sX, sY + (h * i), eX - sX + 1, BORDER);
  }
}

function drawing() {
  canvas.addEventListener('mousemove', mousemoveHandler);
}

function mousemoveHandler(target) {
  clean();
  eX = target.offsetX;
  eY = target.offsetY;
  drawGreenGrid();
}

function mousedownHandler(target) {
  drawing();
  sX = target.offsetX;
  sY = target.offsetY;
  canvas.addEventListener('mouseup', mouseupHandler);
}

function mouseupHandler() {
  clean();
  canvas.removeEventListener('mousemove', mousemoveHandler);
  drawYellowGrid();
  stopDraw();
}

function startDraw() {
  canvas.addEventListener('mousedown', mousedownHandler);
  canvas.focus();
}

function stopDraw() {
  canvas.removeEventListener('mousedown', mousedownHandler);
}

(function () {
  // startDraw();
})();