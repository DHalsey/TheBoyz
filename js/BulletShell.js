//BulletShell prefab
function BulletShell(game, player) {
	Phaser.Sprite.call(this, game, player.x + (Math.cos(player.rotation)*15), player.y + (Math.sin(player.rotation)*15), 'muzzleParticle');

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

	//set additional properties
	this.rotation = player.rotation - (Math.PI/2);
	this.rotation += game.rnd.integerInRange(-.05, .05);
	game.physics.arcade.velocityFromRotation(this.rotation, game.rnd.integerInRange(200,300), this.body.velocity);	
	this.timeCreated = game.time.now;	

	//set random scale
	this.scale.setTo(1);

	//set random angular velocity
	this.body.angularVelocity = game.rnd.integerInRange(-10000,10000);
}

BulletShell.prototype = Object.create(Phaser.Sprite.prototype);
BulletShell.prototype.constructor = BulletShell;

BulletShell.prototype.update = function() {
	if(game.time.now > this.timeCreated + 200) {
		this.destroy();
	}
}
