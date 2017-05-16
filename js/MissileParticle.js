//MissileParticle prefab
function MissileParticle(game, missile) {
	Phaser.Sprite.call(this, game, missile.body.x, missile.body.y, 'missileParticle4');

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);


	//set additional properties
	this.body.velocity.x = game.rnd.integerInRange(-75,75);
	this.body.velocity.y = game.rnd.integerInRange(-75,75);
	this.startTime = game.time.now;
	this.scale.setTo(.5);
}

MissileParticle.prototype = Object.create(Phaser.Sprite.prototype);
MissileParticle.prototype.constructor = MissileParticle;

MissileParticle.prototype.update = function() {
	if(game.time.now > this.startTime + 200) {
		fadeParticle(this);
	}

	if(game.time.now > this.startTime + 2000) {
		this.destroy();
	}
}

function fadeParticle(particle) {
	game.add.tween(particle).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
}