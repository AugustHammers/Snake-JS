class Snakepart {
  constructor (x, y) {
    this.xPos = x;
    this.yPos = y;
  }

  get getXPos() {
    return this.xPos;
  }

  get getYPos() {
    return this.yPos;
  }

  set XPos(x) {
    this.xPos = x;
  }
  
  set YPos(y) {
    this.yPos = y;
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const boxSize = 25; //500px / 20 boxes
const darkerBlue = "#00989d";
const lighterBlue = "#75b3aa";
const snakeBodyColor = "#ed6b87";
let gameSpeed = 15; //15 updates/second
let headXPos = 250; 
let headYPos = 250;
let xVelocity = 0;
let yVelocity = 0;
let appleXPos = Math.floor(Math.random() * 19) * boxSize;
let appleYPos = Math.floor(Math.random() * 19) * boxSize;
const snakeBody = [];
let score = 0;
let gameOver = false;

function drawBoard() {
  ctx.fillStyle = darkerBlue;

  for(let i = 0; i < 20; i++) {
    if (ctx.fillStyle === darkerBlue) {
      ctx.fillStyle = lighterBlue;
    } else {
      ctx.fillStyle = darkerBlue;
    }
    let xPos = i * boxSize;

    for (let j = 0; j < 20; j++) {
      let yPos = j * boxSize;
      if (ctx.fillStyle === darkerBlue) {
        ctx.fillStyle = lighterBlue;
      } else {
        ctx.fillStyle = darkerBlue;
      }  
      ctx.fillRect(xPos, yPos, boxSize, boxSize);
    }
  }
}

function updateSnakePos(){

  for(let i = snakeBody.length-1; i >= 0; i--) {
    let newXPos;
    let newYPos;
    if (i === 0) {
      newXPos = headXPos;
      newYPos = headYPos;
    } else {
      newXPos = snakeBody[i-1].getXPos;
      newYPos = snakeBody[i-1].getYPos;
    }

    console.log(snakeBody[i]);
    snakeBody[i].XPos = newXPos;
    snakeBody[i].YPos = newYPos;
  }

  headXPos += xVelocity;
  headYPos += yVelocity;
}

function updateApplePos(){
  appleXPos = Math.floor(Math.random() * 19) * boxSize;
  appleYPos = Math.floor(Math.random() * 19) * boxSize; 

  if (snakeBody.some(part => {
    if (appleXPos == part.xPos && appleYPos == part.yPos) return true;
  })) {
    updateApplePos();
  }
}

function drawSnake(){
  ctx.fillStyle = snakeBodyColor;
  snakeBody.forEach(part => {
    ctx.fillRect(part.xPos+4, part.yPos+4, boxSize-8, boxSize-8);
  });
  ctx.fillStyle = "yellow";
  ctx.fillRect(headXPos+4, headYPos+4, boxSize-8, boxSize-8);
}

function drawApple(){
  ctx.fillStyle = "red";
  ctx.fillRect(appleXPos+4, appleYPos+4, boxSize-8, boxSize-8);
}

function checkAppleCollision(){
  if (headXPos === appleXPos && headYPos === appleYPos) {
    score++;
    addSnakePart();
    updateApplePos();
  }
}

function checkWallCollision() {
  if (headXPos < 0 || headXPos > 500 || headYPos < 0 || headYPos > 500) {
    gameOver = true;
  }
}

function addSnakePart(){
  snakeBody.push(new Snakepart(headXPos, headYPos));
}

function checkSnakeCollision() {

}

function gameLoop() {
  drawBoard();
  drawSnake();
  drawApple();
  document.addEventListener("keydown", (event) => {
    switch(event.key) {
      case "ArrowUp":
        event.preventDefault(); // To prevent arrow key scrolling
        if (yVelocity == 25) {
          break;
        }

        xVelocity = 0;
        yVelocity = -25;
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (xVelocity == 25) {
          break;
        }

        xVelocity = -25;
        yVelocity = 0;
        break;
      case "ArrowDown":
        event.preventDefault();
        if (yVelocity == -25) {
          break;
        }

        xVelocity = 0;
        yVelocity = 25;
        break;
      case "ArrowRight":
        event.preventDefault();
        if (xVelocity == -25) {
          break;
        }

        xVelocity = 25;
        yVelocity = 0;
        break;
      case "Escape":
        gameSpeed = 1;
        break;
      default:
    }
  });
  updateSnakePos();
  checkAppleCollision();
  checkWallCollision();
  //checkSnakeCollision();
  setTimeout(gameLoop, 1000/gameSpeed);
}

gameLoop();