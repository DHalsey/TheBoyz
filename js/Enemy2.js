//Enemy2.js
//this enemy follows the player slowly and fires bullets

function Enemy2(game, x, y, atlas, frame, health, player) {

	Phaser.Sprite.call(this, game, x, y, atlas, frame);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.anchor.set(0.5);

	//Ebemy2 properties
    this.hp = health;
    this.playerSprite = player;
    this.movementSpeed = 50;

    //These are to allow damage to the player and knockback effects
    this.nextAttack = 0;
    this.attackRate = 500;
    this.nextShot = 0;
    this.fireRate = 800;
    this.knockedBack = false;
}

Enemy2.prototype = Object.create(Phaser.Sprite.prototype);
Enemy2.prototype.constructor = Enemy2;

//override Enemy1's update
Enemy2.prototype.update = function() {
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

    //shoot at the player
    shootPlayer(this);

    //make enemy face the player
    this.rotation = angleToSprite(this, this.playerSprite);

    //handle collision between player and enemy
    game.physics.arcade.collide(this, this.playerSprite, playerEnemy2Collision, null, this);

    //handle collision between bullets and enemy
    game.physics.arcade.overlap(this, playerBullets, bulletsEnemy2Collision, null, this);

    //check if enemy is dead
    if(this.hp <= 0) this.destroy();
}

//when player and enemy1 collide, player hp is decremented and both get knocked back
function playerEnemy2Collision(enemy, player) {
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
function bulletsEnemy2Collision(enemy, bullet) {
    bullet.destroy();
    enemy.hp -= bullet.damage;

    //knock back the enemy
    enemy.knockedBack = true;
    knockback(enemy, 300, enemy.rotation);
    enemy.body.drag.x = 1000;
    enemy.body.drag.y = 1000;
}

function shootPlayer(enemy) {
    if(game.time.now > enemy.nextShot) {
    	enemy.nextShot = game.time.now + enemy.fireRate;

    	//knock back the enemy
    	enemy.knockedBack = true;
    	knockback(enemy, 150, enemy.rotation);
    	enemy.body.drag.x = 1000;
    	enemy.body.drag.y = 1000;
        new EnemyBullet(game, enemy.x, enemy.y, 'atlas', 'bullet0001', 1);
    }
}