//MissileLauncher.js
//this enemy follows the player slowly and fires bullets

function MissileLauncher(game, x, y, atlas, frame, player, spawner) {

	Phaser.Sprite.call(this, game, x, y, atlas, frame);
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
    this.fireRate = 4000;
    this.knockedBack = false;
}

MissileLauncher.prototype = Object.create(Phaser.Sprite.prototype);
MissileLauncher.prototype.constructor = MissileLauncher;

//override MissileLauncher's update
MissileLauncher.prototype.update = function() {

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
}

//this function is used to make an enemy shoot a missile at the player
//requires nextShot and fireRate properties
function shootMissile(enemy) {
    if(game.time.now > enemy.nextShot) {
        enemy.nextShot = game.time.now + enemy.fireRate;
        new EnemyMissile(game, enemy.x, enemy.y, 'atlas', 'bullet0001', 1, enemy.playerSprite);
    }
}