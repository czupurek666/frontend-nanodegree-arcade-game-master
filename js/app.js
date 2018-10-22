let win = false;
let allEnemies= [];
// This JavaScript function always returns a random number between min (included) and max (excluded):
// https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, speed) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x= this.x +this.speed *dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function () {
  Enemy.call(this);
  this.x = 202;
  this.y = 463;
  this.sprite = 'images/char-boy.png';
  this.speed= 0;
}

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function() {

};


Player.prototype.handleInput = function() {
  window.onkeyup = function(e) {
     var key = e.keyCode ? e.keyCode : e.which;

     if (key == 37) {  // left
         player.x = player.x -100;
     }
     else if (key == 38) { // up
         player.y = player.y -80;
     }
     else if (key == 39) {  // right
         player.x = player.x +100;
     }
     else if (key == 40) { // down
         player.y = player.y +80
     }
     }
}


function enemyY(){
  return 63+80*getRndInteger(0,3);
}
/*
function colisions 
function collides(a, b)
{
    if (a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y) return true;
}
*/

// Now instantiate your objects.
// instantiate enemies
// Place all enemy objects in an array called allEnemies
function enemysAttack (){
  if (win === false){
    let enemy1 = new Enemy(-200, enemyY() ,getRndInteger(20, 120));
    allEnemies.unshift(enemy1);
    allEnemies.length = 15;
    }
}
enemysAttack ();
  setInterval(function (){
enemysAttack ();
}, 2000);

// Place the player object in a variable called player

let player= new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
