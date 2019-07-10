
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

//Ball options
let x = 600;
let y = 60;
let startAngle = 10;
let endAngle = 0;
let anticlockwise = Math.PI*2;
let speedX;
let speedY; 
let go = false;


//Mouse controls
let dirArrowX;
let dirArrowY;

let refX;
let refY;
let multi = 0.032;

//Controls
canvas.addEventListener("mousemove", mouseMouvement);
function mouseMouvement(event){
    dirArrowX = event.pageX;
    dirArrowY = event.pageY;
}

//Shoot
canvas.addEventListener("click", shoot);
function shoot(event){
    refX = dirArrowX - 600;
    refY = dirArrowY - 60;
    console.log('no')

    if(refX === 0){
        console.log('1')
        speedX = 0;
        speedY = 20;
    }
    if(refX === refY){
        console.log('2')
        speedX = 20;
        speedY = 20;
    }

if(refX > 0){
    if(refX > refY){
        console.log('3pos')
        speedX = 20;
        speedY = refY * multi;
    }
    if(refX < refY){
        console.log('4pos')
        speedX = refX * multi;
        speedY = 20;
    }
}
if(refX < 0){
    if(refX < -refY){
        console.log('3neg')
        speedX = -20;
        speedY = refY * multi;
    }
    if(refX > -refY){
        console.log('4neg')
        speedX = (refX * multi);
        speedY = 20;
    }
}
    go = true
    console.log(refX, refY)
}


function draw(){
    
    ctx.clearRect(0, 0, 1200, 600)
    
    //Bloc shooter
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.arc(600, 0, 60, 0, anticlockwise);
    ctx.closePath();
    ctx.stroke();
    //shooter line
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(600, 60);
    ctx.lineTo(dirArrowX, dirArrowY);
    ctx.closePath();
    ctx.stroke();
    //Ball
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(x, y, startAngle, endAngle, anticlockwise);
    ctx.closePath();
    ctx.fill();

    //draw shoot
    if(go){
        x += speedX;
        y += speedY;
    }
    
    //Re-init ball
    if(y>=700){
        go = false;
        x = 600
        y = 60
    }

    //Collision walls
    if(x >= 1200 || x <= 0){
        speedX = -speedX;
    }
    if(y <= 0){
        speedY = -speedY;
    }
    // console.log(dirArrowX, dirArrowY)

    window.requestAnimationFrame(draw);
}

draw()
