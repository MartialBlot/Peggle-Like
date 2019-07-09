
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

//Ball options
let x = 500;
let y = 40;
let startAngle = 10;
let endAngle = 0;
let anticlockwise = Math.PI*2;

//Keyboard controls
let keyState = {};    
document.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
document.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

let dirArrowX = 500;
let dirArrowY = 100;
let refShooter = 500;

//Arrow option with mouse -- not yet
//Arrow option with mouse -- not yet
//canvas.addEventListener("mousemove", mouseMouvement);
//function mouseMouvement(event){
//       dirArrowX = event.pageX;
//}

function draw(){

ctx.clearRect(0, 0, 900, 600)

ctx.beginPath();
ctx.arc(x, y, startAngle, endAngle, anticlockwise);
ctx.fill();

ctx.beginPath();
ctx.arc(500, 0, 60, 0, anticlockwise);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(500, 60);
ctx.lineTo(dirArrowX, dirArrowY);
ctx.stroke();

//Controls

// right
if (keyState[39] && dirArrowY >= 60){
    if(dirArrowX>=refShooter){
        dirArrowX+=1
        dirArrowY-=1
    }
    else{
        dirArrowX+=1
        dirArrowY+=1
    }
}

//left
if (keyState[37]){
    if(dirArrowX>=refShooter){
        dirArrowX-=1
        dirArrowY+=1
    }
    else{
        dirArrowX-=1
        dirArrowY-=1
    }
}
console.log(dirArrowY, dirArrowX)

}
draw()

setInterval(draw, 1);


