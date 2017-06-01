//BasicShooter.js
//this enemy follows the player slowly and fires bullets

function BasicShooter(game, x, y, player, spawner) {
    Phaser.Sprite.call(this, game, x, y, 'enemyShooter');
	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.anchor.set(0.5);

	//Ebemy2 properties
    this.hp = 5;
    this.playerSprite = player;
    this.enemySpawner = spawner;
    this.movementSpeed = 50;
    this.docile = true;

    //These are to allow damage to the player and knockback effects
    this.nextAttack = 0;
    this.attackRate = 500;
    this.nextShot = 0;
    this.fireRate = 800;
    this.knockedBack = false;
    this.distanceToPlayer = 0;
    this.range = 750;
}

BasicShooter.prototype = Object.create(Phaser.Sprite.prototype);
BasicShooter.prototype.constructor = BasicShooter;

//override BasicShooter's update
BasicShooter.prototype.update = function() {
    if(this.docile) game.time.events.add(Phaser.Timer.SECOND * 1, makeAggro, this, this);
	else {
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

        this.distanceToPlayer = distance(this, this.playerSprite);

        //shoot at the player
        if(this.distanceToPlayer <= this.range) shootPlayer(this);

        //make enemy face the player
        this.rotation = angleToSprite(this, this.playerSprite);

        //handle collision between player and enemy
        if(!this.playerSprite.isDashing) game.physics.arcade.collide(this, this.playerSprite, playerBasicShooterCollision, null, this);

        //handle collision between bullets and enemy
        game.physics.arcade.overlap(this, playerBullets, bulletsBasicShooterCollision, null, this);

        //check if enemy is dead
        if(this.hp <= 0) {
            this.enemySpawner.enemiesAlive--;
            dropWeapon(this, player);
            this.destroy();
        }
    }
     
}

//when player and enemy1 collide, player hp is decremented and both get knocked back
function playerBasicShooterCollision(enemy, player) {
    if(game.time.now > enemy.nextAttack && !player.isDashing) {
        enemy.nextAttack = game.time.now + enemy.attackRate;
        player.hp --;
        playerHit.play();
        game.camera.shake(0.016, 100);
        knockback(player, 500, angleToSprite(player, enemy));
        enemy.knockedBack = true;
        knockback(enemy, 500, enemy.rotation);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
        console.log("Player HP: " + player.hp); //just for testing
    }
}

//handle collision between bullets group and enemy1
function bulletsBasicShooterCollision(enemy, bullet) {
    makeBloodParticles(bullet, enemy);
    bullet.destroy();
    enemy.hp -= bullet.damage;
    hitMarker.play();

    //knock back the enemy
    if(!enemy.knockedBack) {
        enemy.knockedBack = true;
        knockback(enemy, bullet.knockbackValue, enemy.rotation);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
    }
}
