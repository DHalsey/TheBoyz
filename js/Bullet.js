//bullet prefab
function Bullet(game, x, y, atlas, frame, damage) {
	Phaser.Sprite.call(this, game, x, y, atlas, frame);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = false;
	this.anchor.set(0.5);

	//set additional properties
	this.movementSpeed = 1000;
	this.damage = damage;
	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;

	//make the bullet fire at the pointer
	game.physics.arcade.moveToPointer(this, this.movementSpeed);
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
    	
}
