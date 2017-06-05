//FastCharger.js
//this enemy has low health, quick movement speed
//when in range, it charges at you every 3 seconds

function FastCharger(game, x, y, player, spawner) {

	//Phaser.Sprite.call(this, game, x, y, atlas, frame);
    Phaser.Sprite.call(this, game, x, y, 'atlas2', 'EnemyFastCharger');

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.anchor.set(0.5);

	//FastCharger properties
    this.hp = 3;
    this.playerSprite = player;
    this.enemySpawner = spawner;
    this.movementSpeed = 200;
    this.docile = true;
    this.defaultTint = this.tint;
    this.timeCreated = game.time.now;

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
    //make enemy face the player
    if(!this.knockedBack) this.rotation = angleToSprite(this, this.playerSprite);
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
        
        //update the enemy's distance to the player
        this.distanceToPlayer = distance(this, this.playerSprite);

        //charge attack
        if(game.time.now > this.timeCreated + 1000) chargeAtPlayer(this);

        //handle collision between player and enemy
        if(!this.playerSprite.isDashing) game.physics.arcade.collide(this, this.playerSprite, playerFastChargerCollision, null, this);

        //handle collision between bullets and enemy
        game.physics.arcade.overlap(this, playerBullets, bulletsFastChargerCollision, null, this);

        //check if enemy is dead
        if(this.hp <= 0) {
            this.enemySpawner.enemiesAlive--;
            dropWeapon(this, player);
            this.destroy();
            enemiesKilled += 1000;
            createGreencards(this);
        } 
    }
    
}

//when player and enemy1 collide, player hp is decremented and both get knocked back
function playerFastChargerCollision(enemy, player) {
    if(game.time.now > enemy.nextAttack && !player.isDashing) {
        enemy.nextAttack = game.time.now + enemy.attackRate;
        player.hp --;
        playerHit.play();
        game.camera.shake(0.016, 100);
        knockback(player, 150, angleToSprite(player, enemy));
        enemy.knockedBack = true;
        knockback(enemy, 600, enemy.rotation);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
        console.log("Player HP: " + player.hp); //just for testing
    }
}

//handle collision between bullets group and enemy1
function bulletsFastChargerCollision(enemy, bullet) {
    makeBloodParticles(bullet, enemy);
    bullet.destroy();
    enemy.hp -= bullet.damage;
    damage += bullet.damage * 100;
    hitMarker.play();
    bulletsHit++;

    //knock back the enemy
    if(!enemy.knockedBack) {
        enemy.knockedBack = true;
        knockback(enemy, bullet.knockbackValue, enemy.rotation);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
    }
    
}

