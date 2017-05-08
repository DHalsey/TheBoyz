//FastCharger.js
//this enemy has low health, quick movement speed
//when in range, it charges at you every 3 seconds

function FastCharger(game, x, y, atlas, frame, player) {

	Phaser.Sprite.call(this, game, x, y, atlas, frame);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.anchor.set(0.5);

	//FastCharger properties
    this.hp = 2;
    this.playerSprite = player;
    this.movementSpeed = 200;

    //These are to allow damage to the player and knockback effects
    this.nextAttack = 0;
    this.attackRate = 500;
    this.knockedBack = false;

    //these are for the charge attack
    this.nextCharge = 0;
    this.chargeRate = 1500;
     
    //stores the distance from player
    this.distanceToPlayer = 0;
}

FastCharger.prototype = Object.create(Phaser.Sprite.prototype);
FastCharger.prototype.constructor = FastCharger;

//override FastCharger's update
FastCharger.prototype.update = function() {
    //make enemy move towards the player unless it is in the process of being knocked back
    if(!this.knockedBack) {
        game.physics.arcade.moveToObject(this, this.playerSprite, this.movementSpeed);
    }
    else {  
            //if the enemy is currently being knocked back, wait until the knockback is finished, then restore normal movement
            if(this.body.velocity.x == 0 && this.body.velocity.y == 0) {
                this.knockedBack = false;
                this.body.drag.x = 0;
                this.body.drag.y = 0;
            }
    }
    
    //update the enemy's distance to the player
    this.distanceToPlayer = distance(this, this.playerSprite);

    //charge attack
    chargeAtPlayer(this);

    //make enemy face the player
    if(!this.knockedBack) this.rotation = angleToSprite(this, this.playerSprite);

    //handle collision between player and enemy
    game.physics.arcade.collide(this, this.playerSprite, playerFastChargerCollision, null, this);

    //handle collision between bullets and enemy
    game.physics.arcade.overlap(this, playerBullets, bulletsFastChargerCollision, null, this);

    //check if enemy is dead
    if(this.hp <= 0) this.destroy();
}

//this function returns the angle to ratate thisSprite to, in order to make it face targetSprite
//I based this on phaser's built in method called angleToPointer()
function angleToSprite(thisSprite, targetSprite) {
    var dx = targetSprite.body.x - thisSprite.body.x;
    var dy = targetSprite.body.y - thisSprite.body.y;
    return Math.atan2(dy, dx);
}

//when player and enemy1 collide, player hp is decremented and both get knocked back
function playerFastChargerCollision(enemy, player) {
    if(game.time.now > enemy.nextAttack) {
        enemy.nextAttack = game.time.now + enemy.attackRate;
        player.hp --;
        knockback(player, 400, angleToSprite(player, enemy));
        enemy.knockedBack = true;
        knockback(enemy, 400, enemy.rotation);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
        console.log("Player HP: " + player.hp); //just for testing
    }
}

//handle collision between bullets group and enemy1
function bulletsFastChargerCollision(enemy, bullet) {
    bullet.destroy();
    enemy.hp -= bullet.damage;

    //knock back the enemy
    enemy.knockedBack = true;
    knockback(enemy, 300, enemy.rotation);
    enemy.body.drag.x = 1000;
    enemy.body.drag.y = 1000;
}

//find the distance between two sprites
function distance(sprite1, sprite2) {
    var dx = sprite1.body.x - sprite2.body.x;
    var dy = sprite1.body.y - sprite2.body.y;
    return Math.sqrt(dx*dx + dy*dy);
}

function chargeAtPlayer(enemy) {
      if(enemy.distanceToPlayer <= 300 && game.time.now > enemy.nextCharge) {
        enemy.nextCharge = game.time.now + enemy.chargeRate;

        //knockback the enemy towards the direction its facing
        enemy.knockedBack = true;
        knockback(enemy, 800, enemy.rotation - Math.PI);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
      }
}

