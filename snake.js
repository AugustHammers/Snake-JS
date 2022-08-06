const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasHeight = canvas.height;
const boxSize = 25; //500px / 20 boxes
const darkerBlue = "#00989d";
const lighterBlue = "#75b3aa";

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
  
      console.log(xPos, yPos);
      ctx.fillRect(xPos, yPos, boxSize, boxSize);
    }
  }
}