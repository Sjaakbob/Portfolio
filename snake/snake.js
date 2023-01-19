
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    
    
    class SnakePart{
        constructor(x,y){
            this.x = x;
            this.y = y;
        }
    }
    
    let speed = 7;
    let tileCount = 20;
    let tileSize = canvas.width / tileCount - 2;
    let headX = 10;
    let headY = 10;
    const snakeParts = [];
    let tailLength = 2;
    
    let appleX = 5;
    let appleY = 5;
    
    let xVelocity=0;
    let yVelocity=0;
    
    let score=0;
    let highScore=0;
    
    let gameOver = false;
    
    
    //game loop
    function drawGame(){
        changeSnakePosition();
        let result = death();
        if(result){
                return;
        }
        clearScreen();
        checkAppleCollison();
        drawSnake();
        drawApple();
        drawUI();
        setTimeout(drawGame, 1000 / speed);    
    }
    function death(){
        
    
        if(yVelocity ===0 && xVelocity ===0){
            return false;
        }
        if(headX <0){
            gameOver = true;
        }
        else if(headX == tileCount){
            gameOver = true;
        }
        else if(headY < 0){
            gameOver = true;
        }
        else if(headY == tileCount){
            gameOver = true;
        }   
        for(let i=0; i< snakeParts.length; i++){
            let part = snakeParts[i];
            if(part.x === headX && part.y ===headY){
                gameOver = true;
                //break;
            }
        }
        if(gameOver){
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";
    
            var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5","blue");
            gradient.addColorStop("1.0", "red");
            ctx.fillStyle = gradient;
    
            ctx.fillText("You died!",canvas.width / 4, canvas.height /2);
        }
        return gameOver;  
    }
    function resetGame(){
        
        gameOver = false;
        tailLength = 2;
        yVelocity = 0;
        xVelocity = 0;
        headX = tileCount /2;
        headY = tileCount /2;
        score = 0;
        //ctx.fillStyle = 'black';
        //ctx.fillRect(0,0,canvas.width,canvas.height);
        drawGame();
        
    }
    function drawUI(){
        ctx.fillStyle = 'white';
        ctx.font = '10px Verdana';
        ctx.fillText("Score: " + score, canvas.width - 50, 10);
        ctx.fillText("Highscore: " + highScore, canvas.width - 130, 10);
        ctx.fillText("Press R to reset ", canvas.width -300, 10);
        if (score > highScore){
            highScore = score;
        }
    }
    function clearScreen(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    function drawSnake(){
        ctx.fillStyle='green';
        for(let i=0; i < snakeParts.length; i++){
            let part = snakeParts[i];
            ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
        }
        snakeParts.push(new SnakePart(headX, headY));
        while(snakeParts.length > tailLength)
        {
            snakeParts.shift();
        }
        ctx.fillStyle = 'purple';
        ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    }
    
    function changeSnakePosition(){
        headX = headX + xVelocity;
        headY = headY + yVelocity;
    }
    function drawApple(){
        ctx.fillStyle = 'red';
        ctx.fillRect(appleX * tileCount,appleY * tileCount ,tileSize,tileSize);
    }
    function checkAppleCollison(){
        if(appleX == headX && appleY == headY){
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            tailLength++;
            score++;
        }
    }
    
    
    document.body.addEventListener('keydown', keyDown);
    
    function keyDown(event){
        // up key
        if(event.keyCode == 38 && event.keyCode!==40){
            if (yVelocity ==1){
                return;
            }   
            yVelocity = -1;
            xVelocity = 0;
        }
        // down key
        if(event.keyCode == 40 && event.keyCode!==38){
            if (yVelocity ==-1){
                return;
            }
            yVelocity = 1;
            xVelocity = 0;
        }
        // left key
        if(event.keyCode == 37 && xVelocity !==-1){
            if (xVelocity == 1){
                return;
            }
            yVelocity = 0;
            xVelocity = -1;
        }
         // right key
         if(event.keyCode == 39 && event.keyCode!==37){
            if (xVelocity == -1){
                return;
            }
            yVelocity = 0;
            xVelocity = 1;
        }
    
        //R key
        if(event.keyCode == 82 && gameOver){
            resetGame();
        }
    
    
    }
    
    drawGame();


