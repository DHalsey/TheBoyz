//MissileLauncher.js
//this enemy follows the player slowly and fires bullets

function MissileLauncher(game, x, y, player, spawner) {

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

    //These are to allow damage to the player and knockback effects
    this.nextAttack = 0;
    this.attackRate = 500;
    this.nextShot = 0;
    this.fireRate = 3000;
    this.knockedBack = false;
    this.knockBackTimer = 300;
    this.nextKnockBack = 0;
    this.shotgunTimer = 1200;
    this.docile = true;

    //knockback properties
    this.knockedBack = true;
    this.body.drag.x = 1000;
    this.body.drag.y = 1000;
    this.originalX = x;
    this.originalY = y;

    this.body.immovable = true;
}

MissileLauncher.prototype = Object.create(Phaser.Sprite.prototype);
MissileLauncher.prototype.constructor = MissileLauncher;

//override MissileLauncher's update
MissileLauncher.prototype.update = function() {
    if(this.docile) game.time.events.add(Phaser.Timer.SECOND * 1, makeAggro, this, this);
    else {
        if(this.knockedBack && this.body.x != this.originalX && this.body.y != this.originalY) {
            game.time.events.add(Phaser.Timer.SECOND * .05, this.restoreLocation, this);
        }

        //missile attack
        shootMissile(this);

        //make enemy face the player
        this.rotation = angleToSprite(this, this.playerSprite);

        //handle collision between player and enemy
        if(!this.playerSprite.isDashing) game.physics.arcade.collide(this, this.playerSprite, playerMissileLauncherCollision, null, this);

        //handle collision between bullets and enemy
        game.physics.arcade.overlap(this, playerBullets, bulletsMissileLauncherCollision, null, this);

        //check if enemy is dead
        if(this.hp <= 0) {
            this.enemySpawner.enemiesAlive--;
            this.destroy();
            enemiesKilled += 1000;
        }
    }
 
}

//when player and enemy1 collide, player hp is decremented and both get knocked back
function playerMissileLauncherCollision(enemy, player) {
    if(game.time.now > enemy.nextAttack && !player.isDashing) {
        enemy.nextAttack = game.time.now + enemy.attackRate;
        player.hp --;
        playerHit.play();
        game.camera.shake(0.016, 100);
        knockback(player, 500, angleToSprite(player, enemy));
        console.log("Player HP: " + player.hp); //just for testing
    }
}

//handle collision between bullets group and enemy1
function bulletsMissileLauncherCollision(enemy, bullet) {
    makeBloodParticles(bullet, enemy);
    bullet.destroy();
    enemy.hp -= bullet.damage;
    damage += bullet.damage * 100;
    hitMarker.play();
    bulletsHit++;
    
    knockbackMissileLauncher(enemy, bullet);
}

//this function is used to make an enemy shoot a missile at the player
//requires nextShot and fireRate properties
function shootMissile(enemy) {
    if(game.time.now > enemy.nextShot) {
        enemy.nextShot = game.time.now + enemy.fireRate;
        new EnemyMissile(game, enemy.x, enemy.y, 'enemyMissile', 0, 2, enemy.playerSprite);
        shootMissileAud.play();
    }
}

MissileLauncher.prototype.restoreLocation = function() {
    var tween = game.add.tween(this).to( { x: this.originalX, y: this.originalY }, 200, Phaser.Easing.Linear.None, true);
    this.knockedBack = false;
}


function knockbackMissileLauncher(enemy, bullet) {
    if(game.time.now > enemy.nextKnockBack) {
        
        if(player.currentWeapon != "SHOTGUN") 
            enemy.nextKnockBack = game.time.now + enemy.knockBackTimer;
        else
            enemy.nextKnockBack = game.time.now + enemy.shotgunTimer;

        enemy.knockedBack = true;
        knockback(enemy, bullet.knockbackValue, enemy.rotation);
    }
}

