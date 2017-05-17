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
    this.knockBackTimer = 500;
    this.nextKnockBack = 0;

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

    if(this.knockedBack && this.body.x != this.originalX && this.body.y != this.originalY) {
        game.time.events.add(Phaser.Timer.SECOND * .05, this.restoreLocation, this);
    }

    //missile attack
    shootMissile(this);

    //make enemy face the player
    this.rotation = angleToSprite(this, this.playerSprite);

    //handle collision between player and enemy
    game.physics.arcade.collide(this, this.playerSprite, playerMissileLauncherCollision, null, this);

    //handle collision between bullets and enemy
    game.physics.arcade.overlap(this, playerBullets, bulletsMissileLauncherCollision, null, this);

    //check if enemy is dead
    if(this.hp <= 0) {
        this.enemySpawner.enemiesAlive--;
        this.destroy();
    } 
}

//when player and enemy1 collide, player hp is decremented and both get knocked back
function playerMissileLauncherCollision(enemy, player) {
    if(game.time.now > enemy.nextAttack) {
        enemy.nextAttack = game.time.now + enemy.attackRate;
        player.hp --;
        knockback(player, 500, angleToSprite(player, enemy));
        console.log("Player HP: " + player.hp); //just for testing
    }
}

//handle collision between bullets group and enemy1
function bulletsMissileLauncherCollision(enemy, bullet) {
    bullet.destroy();
    enemy.hp -= bullet.damage;
    
    knockbackMissileLauncher(enemy, bullet);
}

//this function is used to make an enemy shoot a missile at the player
//requires nextShot and fireRate properties
function shootMissile(enemy) {
    if(game.time.now > enemy.nextShot) {
        enemy.nextShot = game.time.now + enemy.fireRate;
        new EnemyMissile(game, enemy.x, enemy.y, 'atlas', 'bullet0001', 2, enemy.playerSprite);
    }
}

MissileLauncher.prototype.restoreLocation = function() {
    var tween = game.add.tween(this).to( { x: this.originalX, y: this.originalY }, 300, Phaser.Easing.Linear.None, true);
    this.knockedBack = false;
}


function knockbackMissileLauncher(enemy, bullet) {
    console.log('here');
    if(game.time.now > enemy.nextKnockBack) {
        enemy.nextKnockBack = game.time.now + enemy.knockBackTimer;

        console.log('here2');

        enemy.knockedBack = true;
        knockback(enemy, bullet.knockbackValue, enemy.rotation);
    }
}