
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
let showLastChance = false;

//Ennemies balls
let balls = [];
let ballsDead = [];
let ballsDelete = 0 ;
let nbEnnemies = 50;

function ball (x, y, size, color, draw) {
    this.x = Math.floor(Math.random() * 900) + 150;
    this.y = Math.floor(Math.random() * 420) + 100;
    this.size = 10;
    this.color = 'yellow';
    this.draw = true;
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
let colorBox = 'orange';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    }

//Mouse controls
let dirArrowX;
let dirArrowY;

let refX;
let refY;
let multi = 0.032;
let rightToShoot = true;

//Controls
canvas.addEventListener("mousemove", mouseMouvement);
function mouseMouvement(event){
    dirArrowX = event.pageX;
    dirArrowY = event.pageY;
}

//Shoot
canvas.addEventListener("click", shoot);
function shoot(event){
    if(rightToShoot){
    nbBalls--;

    refX = dirArrowX - 600;
    refY = dirArrowY - 60;

    if(refX === 0){
        speedX = 0;
        speedY = 20;
    }
    if(refX === refY){
        speedX = 20;
        speedY = 20;
    }

if(refX > 0){
    if(refX > refY){
        speedX = 20;
        speedY = refY * multi;
    }
    if(refX < refY){
        speedX = refX * multi;
        speedY = 20;
    }
}
if(refX < 0){
    if(refX < -refY){
        speedX = -20;
        speedY = refY * multi;
    }
    if(refX > -refY){
        speedX = (refX * multi);
        speedY = 20;
    }
}
    go = true;
}
rightToShoot = false;
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
    ctx.fillStyle = colorBox;
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
    if(showLastChance){
    ctx.fillText(`It's your last chance !!!!!!!!`, 950, 30);
    }

    //Crazy box movements
    cB += speedBox;
    if(cB >= 1050 || cB <= 0){
        speedBox = - speedBox;
    }

    //Balls Ennemies
    while(balls.length < nbEnnemies){
        let Ball = new ball();
        balls.push(Ball)
    }
    for (let i = 0; i < balls.length; i++) {
        if(balls[i].draw){
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
            ballsDead.push(balls[i])
            ballsDelete += 1;
            console.log(ballsDelete);
            }
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

    if(ballsDelete === nbEnnemies){
        if(confirm(`!!! Win !!!!- Your score : ${score} - Play gain ?`)){
            document.location.reload(true);
            return;
        } else { };
    }

    if(y>=700){
        for (let i = 0; i < balls.length; i++) {
        for (let k = 0; k < ballsDead.length; k++) {
            if(balls[i] === ballsDead[k]){
                balls[i].draw = false;
            }            
        }
    }
        ballsDead = [];
        go = false;
        x = 600
        y = 60
        rightToShoot= true; 

        if(nbBalls === 1){
            showLastChance = true;
        }
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
        nbBalls ++;
        x = 600
        y = 60
        go = false;
        colorBox = getRandomColor()
        for (let i = 0; i < balls.length; i++) {
            for (let k = 0; k < ballsDead.length; k++) {
                if(balls[i] === ballsDead[k]){
                    balls[i].draw = false;
                }            
            }
    }
    rightToShoot= true; 
}
    window.requestAnimationFrame(draw);
}

draw()
