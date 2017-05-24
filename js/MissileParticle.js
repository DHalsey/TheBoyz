//MissileParticle prefab
function MissileParticle(game, missile) {
	var rand = game.rnd.integerInRange(1,2);
	var sprite = '';

	if(rand == 1) sprite = 'missileParticle1';
	else sprite = 'missileParticle2';

	Phaser.Sprite.call(this, game, missile.body.x, missile.body.y, sprite);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

	var vel = 250;


	//set additional properties
	this.body.velocity.x = game.rnd.integerInRange(-vel,vel);
	this.body.velocity.y = game.rnd.integerInRange(-vel,vel);
	this.startTime = game.time.now;

	//set random scale
	rand = game.rnd.realInRange(0.5, 1.2);
	this.scale.setTo(rand);
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