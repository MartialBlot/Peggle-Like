
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

//Ball options
let x = 600;
let y = 60;
let startAngle = 10;
let endAngle = 0;
let anticlockwise = Math.PI*2;

//Mouse controls
canvas.addEventListener("mousemove", mouseMouvement);

let dirArrowX = 600;
let dirArrowY = 100;
let refShooter = 600;

function draw(){

ctx.clearRect(0, 0, 1200, 600)

ctx.beginPath();
ctx.arc(x, y, startAngle, endAngle, anticlockwise);
ctx.fill();

ctx.beginPath();
ctx.arc(600, 0, 60, 0, anticlockwise);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(600, 60);
ctx.lineTo(dirArrowX, dirArrowY);
ctx.stroke();

//Controls
function mouseMouvement(event){
    dirArrowX = event.pageX;
    dirArrowY = event.pageY;
    }
}
draw()

setInterval(draw, 1);


