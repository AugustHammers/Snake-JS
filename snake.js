const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const boxSize = 25; //500px / 20 boxes
const darkerBlue = "#00989d";
const lighterBlue = "#75b3aa";
let gameSpeed = 15; //60 updates/second
let headXPos = 250; 
let headYPos = 250;
let xVelocity = 0;
let yVelocity = 0;
let appleXPos = Math.floor(Math.random() * 19) * boxSize;
let appleYPos = Math.floor(Math.random() * 19) * boxSize;
let score = 0;

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
  headXPos += xVelocity;
  headYPos += yVelocity;
}

function updateApplePos(){
  appleXPos = Math.floor(Math.random() * 19) * boxSize;
  appleYPos = Math.floor(Math.random() * 19) * boxSize; 
}

function drawSnake(){
  ctx.fillStyle = "yellow";
  ctx.fillRect(headXPos+4, headYPos+4, boxSize-8, boxSize-8);
}

function drawApple(){
  ctx.fillStyle = "red";
  ctx.fillRect(appleXPos+4, appleYPos+4, boxSize-8, boxSize-8);
}

function gameLoop() {
  drawBoard();
  drawSnake();
  drawApple();
  document.addEventListener("keydown", (event) => {
    event.preventDefault(); // To prevent arrow key scrolling
    switch(event.key) {
      case "ArrowUp":
        if (yVelocity == 25) {
          break;
        }

        xVelocity = 0;
        yVelocity = -25;
        break;
      case "ArrowLeft":
        if (xVelocity == 25) {
          break;
        }

        xVelocity = -25;
        yVelocity = 0;
        break;
      case "ArrowDown":
        if (yVelocity == -25) {
          break;
        }

        xVelocity = 0;
        yVelocity = 25;
        break;
      case "ArrowRight":
        if (xVelocity == -25) {
          break;
        }

        xVelocity = 25;
        yVelocity = 0;
        break;
      default:
    }
  });

  updateSnakePos();
  if (headXPos === appleXPos && headYPos === appleYPos) {
    score++;
    updateApplePos();
  }
  setTimeout(gameLoop, 1000/gameSpeed);
}

gameLoop();