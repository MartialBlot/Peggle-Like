
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
let multi = 0.0084;

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
    canvas.addEventListener("mousemove", mouseMouvement);
    
    function mouseMouvement(event){
        dirArrowX = event.pageX;
        dirArrowY = event.pageY;
    }

    if(go){
        x += speedX;
        y += speedY;
    }
    
    canvas.addEventListener("click", shoot);
    //shoot
    function shoot(event){
        refX = dirArrowX - 600;
        refY = dirArrowY - 60
        console.log('no')

        if(refX === 0){
            console.log('1')
            speedX = 0;
            speedY = 5;
        }
        if(refX === refY){
            console.log('2')
            speedX = 5;
            speedY = 5;
        }

        if(refX > 0){
        if(refX > refY){
            console.log('3')
            speedX = 5;
            speedY = refY * multi;
        }
        if(refX < refY){
            console.log('4')
            speedX = refX * multi;
            speedY = 5;
        }
    }
    if(refX < 0){
        if(refX < refY){
            console.log('3')
            speedX = -5;
            speedY = refY * multi;
        }
        if(refX > (-refY)){
            console.log('4')
            speedX = (refX * multi);
            speedY = 5;
        }
    }
        go = true
    //     console.log(refX, refY)
    // console.log(dirArrowX, dirArrowY)

    }
    //Re-init ball
    if(y>=900){
        go = false;
        x = 600
        y = 60
    }
    // console.log(dirArrowX, dirArrowY)

    window.requestAnimationFrame(draw);
}

draw()
