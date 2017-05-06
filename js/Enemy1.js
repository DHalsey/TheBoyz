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

    //These are to allow damage to the player and knockback effects
    this.nextAttack = 0;
    this.attackRate = 1000;
    this.knockedBack = false;
}

Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy1.prototype.constructor = Enemy1;

//override Enemy1's update
Enemy1.prototype.update = function() {
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

    //make enemy face the player
    this.rotation = angleToSprite(this, this.playerSprite);

    //handle collision between player and enemy
    game.physics.arcade.collide(this, this.playerSprite, playerEnemy1Collision, null, this);

    //handle collision between bullets and enemy
    game.physics.arcade.overlap(this, bullets, bulletsEnemy1Collision, null, this);

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
function playerEnemy1Collision(enemy, player) {
    if(game.time.now > enemy.nextAttack) {
        enemy.nextAttack = game.time.now + enemy.attackRate;
        player.hp --;
        knockback(player, 500, angleToSprite(player, enemy));
        enemy.knockedBack = true;
        knockback(enemy, 500, enemy.rotation);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
        console.log("Player HP: " + player.hp); //just for testing
    }
}

//handle collision between bullets group and enemy1
function bulletsEnemy1Collision(enemy, bullet) {
    bullet.destroy();
    enemy.hp -= bullet.damage;

    //knock back the enemy
    enemy.knockedBack = true;
    knockback(enemy, 300, enemy.rotation);
    enemy.body.drag.x = 1000;
    enemy.body.drag.y = 1000;
}

