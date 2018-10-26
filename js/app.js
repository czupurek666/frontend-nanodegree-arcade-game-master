
// global variables
let win = false;
let allEnemies= [];
let colision = false;
// This JavaScript function always returns a random number between min (included) and max (excluded):
// https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// Enemies our player must avoid (enemies prototype function)
/**
* @description Enemies constructor
* @constructor
* @param {number} this.x - x position of an object
* @param {number} this.y - y position of an object
* @param {number} this.speed - speed of an object
* @param {string} this.sprite - object image reference
*/
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position
// TODO: add other fruits
// @param {number} dt, a time delta between ticks
Enemy.prototype.update = function(dt, speed) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x= this.x +this.speed *dt;
}

// TODO:Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
* @description player class constructor
* @constructor
* @param {number} this.x - x position of an object
* @param {number} this.y - y position of an object
* @param {number} this.speed - speed of an object
* @param {string} this.sprite - object image reference
*/

var Player = function () {
    Enemy.call(this);
    this.x = 202;
    this.y = 463;
    this.sprite = 'images/char-boy.png';
    this.speed= 0;


  }
// TODO: player gets a prototype enemy to use the render function of enemy
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;


// player update() methode
// TODO: sets a winning condition
Player.prototype.update = function() {
    if (this.y === -17){
      win = true;
    }
}

//player handleInput() methode
// TODO: moves the player after pressing the arrow keys

Player.prototype.handleInput = function (input){
  if (input == 'left' && this.x > 2) {
    this.x = this.x -100;
  }
  else if (input == 'up' && this.y  >0) {
    this.y = this.y -80;
  }
  else if (input == 'right' && this.x < 402) {
    this.x = this.x +100;
  }
  else if (input == 'down' && this.y < 383) {
    this.y = this.y +80
  }
};

// TODO: generates how high will run the enemy
// from 3 possible highness: 63, 143, 223
function enemyY(){
    return 63+80*getRndInteger(0,3);
};

// TODO: check collision beteen player and enemy
// checks if player and enemy are in the same rows
// checks if x positions of player and enemy overlaps
// (with margin of 25 pixels)
// if yes the vert of collision bolean is changed into 'true'
function checkCollisions(){
    allEnemies.forEach(function(enemy){
      if (player.y === enemy.y &&
        player.x  < enemy.x + 101 &&
        player.x + 101 > enemy.x){
        colision = true;
      }
    });
  };

// TODO: reloads the game
function playerReset(){
    setTimeout(function () {
      location.reload();
    }, 500);
};

// TODO: reloads the game in case of failure
function failure(){
    if (colision === true){
      playerReset ();
    }
};

// TODO: displays the 'Congratulations' message
// restarts the game
function  winningMessage (){
    document.querySelector('.modalContainer').style.display = 'block';
    setTimeout(function () {
      playerReset ();
    }, 4000);

};

// TODO: funktion instantiating the enemies objects.
// Placing all enemy objects in an array called allEnemies
// limiting the length of array to 15
function enemysAttack (){
    if (win === false){
      let enemy1 = new Enemy(-200, enemyY() ,getRndInteger(60, 160));
      allEnemies.unshift(enemy1);
      allEnemies.length = 15;
      }
      else {
        winningMessage ();
    }
}

// calling the function enemysAttack
enemysAttack ();
enemysAttack ();
enemysAttack ();
// calling the function enemysAttack with the time interval
setInterval(function (){
    enemysAttack ();
}, 1000);


// Placing the player object in a variable called player
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
