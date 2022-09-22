/*
STILL WORKING ON THE PING-PONG!!
MAY STILL ADDITIONALLY ADD THE HTML FILES

Description will be added some time when I feel like it

Fork this if you have suggestions/improvements :)

Player1/2 still needs work so I post this just to update later (22th September 2022)
*/


var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");
var cHeight = c.height;
var cWidth = c.width;

function Paddle(x, y) {

  this.colour = "GREEN";
  this.xPos = x;
  this.yPos = y;
  this.width = 12;
  this.height = 60;
  this.speed = 3;

}

Paddle.prototype.drawMe = function() {
  ctx.fillStyle = this.colour;
  ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
};


function hit(a, b) {

  if (
    a.x2 < b.x ||
    b.x2 < a.x ||
    a.y2 < b.y ||
    b.y2 < a.y   
  ) {
    return false;
  }


  return true;
}

function hitTop(a, b) {
  return (a.y2 > b.y && a.y < b.y) ? true : false;
}

function hitBottom(a, b) {
  return (a.y < b.y2 && a.y2 > b.y2) ? true : false;
}

function hitObj(obj) {

  var h = {x:0, y:0, x2:0, y2:0};
    
  if (obj.radius) {
    h.x = obj.xPos - obj.radius;
    h.x2 = obj.xPos + obj.radius;
    h.y = obj.yPos - obj.radius;
    h.y2 = obj.yPos + obj.radius;
  } else {
    h.x = obj.xPos;
    h.x2 = obj.xPos + obj.width | (obj.radius * 2);
    h.y = obj.yPos;
    h.y2 = obj.yPos + obj.height | (obj.radius * 2);
  }
    

  return h;
}

function Sphere() {
  this.radius = (10);
  this.colour = "BLUE";
  this.xPos = 25; 
  this.yPos = 5; 
  this.speedY = 5; 
  this.speedX = 5; 
}

Sphere.prototype.drawMe = function() {
  ctx.beginPath();
  ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, true);
  ctx.fillStyle = this.colour;
  ctx.fill();
};

Sphere.prototype.moveMe = function() {
  var pos = {
    x: this.xPos,
    y: this.yPos
  };

  this.yPos += this.speedY;
  this.xPos += this.speedX;

  if (this.yPos > cHeight - this.radius) {
    this.yPos = pos.y;
    this.speedY = -this.speedY;


  }
  else if (this.yPos < 0 + this.radius) {
    this.yPos = pos.y;
    this.speedY = -this.speedY;
  }

  if ((this.xPos+this.radius) >= cWidth || this.xPos <= 0) {
    this.xPos = pos.x;
    this.speedX = -this.speedX;
  }
  
  else {
    
    var d1 = hitObj(player1);
    var d2 = hitObj(player2);
    var ball = hitObj(this);
        
    if (hit(ball, d2)) {
      this.xPos = pos.x;
      this.speedX *= -1;
      if (
        (this.speedY > 0 && hitTop(ball, d2)) ||    
        (this.speedY < 0 && hitBottom(ball, d2))
      ) {
        this.yPos = pos.y;
        this.speedY *= -1;
      }
    } else if (hit(ball, d1)) {
      this.xPos = pos.x;
      this.speedX *= -1;
      if (
        (this.speedY > 0 && hitTop(ball, d1)) ||    
        (this.speedY < 0 && hitBottom(ball, d1))
      ) {
        this.yPos = pos.y;
        this.speedY *= -1;
      }
    }
  }
};
var ball = new Sphere();
var p1 = new Paddle(10, 150);
var p2 = new Paddle(580, 150);


var keysDown = [];


window.addEventListener("keydown", function(event) {
  keysDown[event.key] = true; 
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.key];
});

function checkKeys() {

  if (keysDown[90]) {
    if (p1.yPos > 0) {
      p1.yPos -= p1.speed;

    }
  }

  if (keysDown[88]) {
    if (p1.yPos < (cHeight - p1.height)) {
      p1.yPos += p1.speed;
    }
  }

  if (keysDown[190]) {
    if (p2.yPos > 0) {
      p2.yPos -= p2.speed;
    }
  }

  if (keysDown[188]) {
    if (p2.yPos < (cHeight - p2.height)) {
      p2.yPos += p2.speed;
    }
  }

}

render();
