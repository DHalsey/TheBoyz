//TankyCharger.js
//this charger has low movement speed, high health

function TankyCharger(game, x, y, player, spawner) {

	//Phaser.Sprite.call(this, game, x, y, atlas, frame);
    Phaser.Sprite.call(this, game, x, y, 'enemyTank');
	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.anchor.set(0.5);

	//TankyCharger properties
    this.hp = 10;
    this.playerSprite = player;
    this.enemySpawner = spawner;
    this.movementSpeed = 125;
    this.docile = true;

    //These are to allow damage to the player and knockback effects
    this.nextAttack = 0;
    this.attackRate = 500;
    this.knockedBack = false;
}

TankyCharger.prototype = Object.create(Phaser.Sprite.prototype);
TankyCharger.prototype.constructor = TankyCharger;

//override TankyCharger's update
TankyCharger.prototype.update = function() {
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

        //make enemy face the player
        this.rotation = angleToSprite(this, this.playerSprite);

        //handle collision between player and enemy
        if(!this.playerSprite.isDashing) game.physics.arcade.collide(this, this.playerSprite, playerTankyChargerCollision, null, this);

        //handle collision between bullets and enemy
        game.physics.arcade.overlap(this, playerBullets, bulletsTankyChargerCollision, null, this);

        //check if enemy is dead
        if(this.hp <= 0) {
            this.enemySpawner.enemiesAlive--;
            dropWeapon(this, player);
            this.destroy();
        }
    }
     
}

//when player and enemy1 collide, player hp is decremented and both get knocked back
function playerTankyChargerCollision(enemy, player) {
    if(game.time.now > enemy.nextAttack && !player.isDashing) {
        enemy.nextAttack = game.time.now + enemy.attackRate;
        player.hp --;
        playerHit.play();
        knockback(player, 400, angleToSprite(player, enemy));
        enemy.knockedBack = true;
        knockback(enemy, 200, enemy.rotation);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
        console.log("Player HP: " + player.hp); //just for testing
    }
}

//handle collision between bullets group and enemy1
function bulletsTankyChargerCollision(enemy, bullet) {
    makeBloodParticles(bullet, enemy);
    bullet.destroy();
    enemy.hp -= bullet.damage;
    hitMarker.play();

    //knock back the enemy
    if(!enemy.knockedBack) {
        enemy.knockedBack = true;
        knockback(enemy, bullet.knockbackValue/1.5, enemy.rotation);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
    }
}

