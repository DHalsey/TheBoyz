//BasicCharger.js
//the standard, boring enemy type

function BasicCharger(game, x, y, player, spawner) {

	//Phaser.Sprite.call(this, game, x, y, atlas, frame);
    Phaser.Sprite.call(this, game, x, y, 'enemyCharger');

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.anchor.set(0.5);

	//BasicCharger properties
    this.hp = 5;
    this.playerSprite = player;
    this.enemySpawner = spawner;
    this.movementSpeed = 150;

    //These are to allow damage to the player and knockback effects
    this.nextAttack = 0;
    this.attackRate = 500;
    this.knockedBack = false;
}

BasicCharger.prototype = Object.create(Phaser.Sprite.prototype);
BasicCharger.prototype.constructor = BasicCharger;

//override BasicCharger's update
BasicCharger.prototype.update = function() {
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
    game.physics.arcade.collide(this, this.playerSprite, playerBasicChargerCollision, null, this);

    //handle collision between bullets and enemy
    game.physics.arcade.overlap(this, playerBullets, bulletsBasicChargerCollision, null, this);

    //check if enemy is dead
    if(this.hp <= 0) {
        this.enemySpawner.enemiesAlive--;
        dropWeapon(this, player);
        this.destroy();
    } 
}

//when player and enemy1 collide, player hp is decremented and both get knocked back
function playerBasicChargerCollision(enemy, player) {
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
function bulletsBasicChargerCollision(enemy, bullet) {
    bullet.destroy();
    enemy.hp -= bullet.damage;

    //knock back the enemy
    if(!enemy.knockedBack) {
        enemy.knockedBack = true;
        knockback(enemy, 300, enemy.rotation);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
    }
}

