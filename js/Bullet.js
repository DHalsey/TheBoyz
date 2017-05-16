//bullet prefab
function Bullet(game, x, y, atlas, frame, damage) {
	Phaser.Sprite.call(this, game, x, y, atlas, frame);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

    //properties that allow bullets to be destroyed at world bounds
    this.body.collideWorldBounds = true;
    this.body.onWorldBounds = new Phaser.Signal();
    this.body.onWorldBounds.add(destroyBullet, this);

	//set additional properties
	this.movementSpeed = 1000;
	this.damage = damage;

	//add to the bullets group
	playerBullets.add(this);

	//make the bullet fire at the pointer
	toPointer(this, this.movementSpeed);

	//temporarily scale the bullet sprite
	this.scale.setTo(2,2);
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
	game.physics.arcade.collide(enemyMissiles, this, missileBulletCollision, null, this);
}

function destroyBullet(bullet) {
   bullet.destroy();
}

function missileBulletCollision(missile, bullet) {
	missile.destroy();
	bullet.destroy();
}