document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Thiết lập kích thước canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function endPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }

  // Lắng nghe sự kiện mousedown, mouseup và mousemove để vẽ
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);
});

function changeCursor() {
  var btn = document.getElementById("erase");
  btn.classList.add("erase-cursor");
  document.body.style.cursor = 'url("eraser-solid.svg"), pointer';
}
