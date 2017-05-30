//HealthParticle.js
function HealthParticle(game, pack) {
	var rand = game.rnd.integerInRange(1,3);
	var sprite = '';

	if(rand == 1) sprite = 'healthParticle';
	else if(rand == 2) sprite = 'healthParticle2'
	else sprite = 'healthParticle3';

	Phaser.Sprite.call(this, game, pack.x, pack.y, sprite);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

	//set additional properties
	this.rotation = -Math.PI/2;
	this.rotation += game.rnd.realInRange(Math.PI/6, -Math.PI/6);
	game.physics.arcade.velocityFromRotation(this.rotation, game.rnd.integerInRange(400,500), this.body.velocity);	
	this.body.gravity.y = 1000;
	this.timeCreated = game.time.now;	

	//set random scale
	this.scale.setTo(1);

	//set random angular velocity

}

HealthParticle.prototype = Object.create(Phaser.Sprite.prototype);
HealthParticle.prototype.constructor = HealthParticle;

HealthParticle.prototype.update = function() {
	if(game.time.now > this.timeCreated + 800) {
		this.destroy();
	}
}

function healthParticleExplosion(pack) {
	for(var i=0; i<40; i++) {
		new HealthParticle(game, pack);
	}
}