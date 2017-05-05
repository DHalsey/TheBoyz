//Enemy1.js

function Enemy1(game, x, y, atlas, frame, health, player) {

	Phaser.Sprite.call(this, game, x, y, atlas, frame);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.anchor.set(0.5);

	//Ebemy1 properties
    this.hp = health;
    this.playerSprite = player;
    this.movementSpeed = 150;

    //These are to allow damage to the player
    this.nextAttack = 0;
    this.attackRate = 1000;
}

Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy1.prototype.constructor = Enemy1;

//override Enemy1's update
Enemy1.prototype.update = function() {
    //make enemy move towards the player
    game.physics.arcade.moveToObject(this, this.playerSprite, this.movementSpeed);

    //make enemy face the player
    this.rotation = angleToSprite(this, this.playerSprite);

    //handle collision between player and enemy
    game.physics.arcade.collide(this, this.playerSprite, playerEnemy1Collision, null, this);
}

//this function returns the angle to ratate thisSprite to, in order to make it face targetSprite
//I based this on phaser's built in method called angleToPointer()
function angleToSprite(thisSprite, targetSprite) {
    var dx = targetSprite.body.x - thisSprite.body.x;
    var dy = targetSprite.body.y - thisSprite.body.y;
    return Math.atan2(dy, dx);
}

function playerEnemy1Collision(enemy, player) {
    if(game.time.now > enemy.nextAttack) {
        enemy.nextAttack = game.time.now + enemy.attackRate;
        player.hp --;
        console.log(player.hp);
    }
}