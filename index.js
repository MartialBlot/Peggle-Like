
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

//Bar Menu
let score = 0;
let nbBalls = 10; 

//Ennemies balls
let balls = [];
let ballsDead = [];

function ball (x, y, size, color) {
    this.x = Math.floor(Math.random() * 1000) + 200;
    this.y = Math.floor(Math.random() * 420) + 100;
    this.size = 10;
    this.color = 'yellow';
    
}

ball.prototype.drawE = function (){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}
//Crazy box
let speedBox = 5;
let cB = 600;

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

    nbBalls--;

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

//FPS
let baseFps = new Date();

function draw(){
    //FPS
    let refFps = new Date();
    let fps = 1000 / (refFps - baseFps);
    baseFps = refFps;
    
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
    //Crazy box
    ctx.beginPath();
    ctx.fillStyle = 'orange';
    ctx.rect(cB, 580, 150, 20);
    ctx.closePath();
    ctx.fill();
    //Ball
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(x, y, startAngle, endAngle, anticlockwise);
    ctx.closePath();
    ctx.fill();

    //menu bar
    ctx.font = '22px serif';
    ctx.fillText(`FPS : ${Math.round(fps)}`, 20, 30);
    ctx.fillText(`Score : ${score}`, 110, 30);
    ctx.fillText(`Balls : ${nbBalls}`, 280, 30);

    //Crazy box movements
    cB += speedBox;
    if(cB >= 1050 || cB <= 0){
        speedBox = - speedBox;
    }

    //Balls Ennemies
    while(balls.length < 30){
        let Ball = new ball();
        balls.push(Ball)
    }
    for (let i = 0; i < balls.length; i++) {
        balls[i].drawE();
        //Collision ennemies
        if((y+10)>balls[i].y &&(y+10)<(balls[i].y+10) && (x+10)>balls[i].x && (x+10)<(balls[i].x+10) ||
        (y+10)>balls[i].y &&(y+10)<(balls[i].y+10) && (x)<(balls[i].x+10) && (x)>(balls[i].x) ||
        (y)<(balls[i].y+10) && (y)>(balls[i].y) && (x+10)>balls[i].x && (x+10)<(balls[i].x+10) ||
        (y)<(balls[i].y+10) && (y)>(balls[i].y) && (x)<(balls[i].x+10) && (x)>(balls[i].x)){
            speedY = -speedY;
            if(balls[i].color === 'yellow'){
            balls[i].color = "red";
            score += 500;
            ballsDead.push(balls.indexOf(balls[i]))
            }
        }
    }

    //draw shoot
    if(go){
        x += speedX;
        y += speedY;
    }
    
    //Re-init ball
    if(y>=700 && nbBalls === 0){
        if(confirm(`Game Over - Your score : ${score} - Play gain ?`)){
            document.location.reload(true);
        } else { }
    }
    if(y>=700){

        for (let i = 0; i < ballsDead.length; i++) {
            balls.splice(balls[i],1)            
        }
        ballsDead = [];

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
    //Collision with Box
    if((y+10) >= 580 && x >= cB && x <= (cB + 150)){
        speedY = -speedY;
    }
    window.requestAnimationFrame(draw);
}

draw()
