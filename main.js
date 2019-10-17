var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let floor = new Floor(0, 400, canvas.width, 100, "#eb89cf")
let player = new Player(40, 10, 50, 50, "#eccf55");

const g = 3.0;
var timePassed = 0;

var blocks = [];
var blockSpeed = 0.2;

var waitClear = false;
var waitCounter = 0;
var score = 0;

var particles = [];

var shaking = false;
var shakeCounter = 0;
var shake = 6;

function draw() {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(shaking) {
    shakeCounter++;
    if(shakeCounter == 65) {
      shakeCounter = 0;
      shaking = false;
    }
    ctx.transform(1,0,0,1,((Math.random() * 2) - 1)*shake, ((Math.random() * 2) - 1)*shake);
  }

  floor.draw(ctx);
  player.draw(ctx);

  //blocks
  for(let i = 0;i<blocks.length;i++) {
    blocks[i].draw(ctx);
    blocks[i].x-= this.blockSpeed;

    //drop block
    if(blocks[i].y < floor.y - blocks[i].height - 1) {
      blocks[i].y += g;
    }

    //check if block hits Player
    if(blocks[i].x < player.x + player.width - 5) {
      blocks.splice(0, 1); //remove block
      player.hp--;
      player.currentString = "";

      shaking = true;

      //end game when player loses
      if(player.hp == 0) {
        spawnParticles(player.x + player.width/2, player.y + player.height/2, player.color, 100);
        window.location = "end.html";
      }
    }
  }

  //particles
  for (let i = 0;i<particles.length;i++) {
    particles[i].draw(ctx, canvas);
    if(particles[i].lifeCounter == particles[i].lifetime) {
      particles.splice(i, 1);
    }
  }

  //drop player
  if(player.y < floor.y - player.height) {
    player.y += g;
  }

  //level difficulty
  timePassed++;
  if(timePassed % 1500 === 0) {
    blocks.push(new Block(canvas.width - 25, 10, 50, 70, 100, 100));
  }
  if(timePassed % 3000 === 0) {
    timePassed = 0;
    blockSpeed += 0.02;
  }

  //show typed words
  ctx.fillStyle = "#d51111";
  ctx.font = "bold 50px Arial";
  ctx.fillText(player.currentString,
    (canvas.width/2) - (ctx.measureText(player.currentString).width/2), 300);

  ctx.fillStyle = "#000000";
  ctx.fillText("Score: " + score,
    (canvas.width/2) - (ctx.measureText("Score: " + score).width/2), 230);

  if(waitClear) {
    waitCounter++;
    if(waitCounter == 60) {
      player.currentString = "";
      waitCounter = 0;
      waitClear = false;
    }
  }
}

function isValidCharacter(char) {
  for(let i = 0;i<characters.length;i++) {
    if(char == characters.charAt(i)) {
      return true;
    }
  }
  return false;
}

function typeSuccess() {
  waitClear = true;

  spawnParticles(blocks[0].x + blocks[0].width/2,
    blocks[0].y + blocks[0].height/2, "#9df18c", 30);
  spawnParticles(blocks[0].x + blocks[0].width/2,
    blocks[0].y + blocks[0].height/2, "#fc5757", 10);

  //remove current block
  blocks.splice(0, 1);
  score++;
}

function spawnParticles(x, y, color, amount) {
  for (let i = 0;i<amount;i++) {
    particles.push(new Particle(x, y, 1, color, 800));
  }
}

//key input
document.addEventListener("keydown", function(event) {
  var key = event.key;

  if(key == "Backspace" && player.currentString.length >= 1) {
    player.currentString = player.currentString.slice(0, -1);
  }else if(isValidCharacter(key)) {
    player.currentString += key;
    if(blocks.length > 0 && player.currentString == blocks[0].string) {
      typeSuccess();
    }
  }
}, true);

function startGame() {
  player.hp = 3;

  timePassed = 0;

  blocks = [];
  blockSpeed = 0.2;

  waitClear = false;
  waitCounter = 0;
  score = 0;

  particles = [];

  shaking = false;
  shakeCounter = 0;
  shake = 6;

  setInterval(draw, 1);
}

this.startGame();
