//MuzzleParticle prefab
function MuzzleParticle(game, player) {
	var rand = game.rnd.integerInRange(1,2);
	var sprite = '';

	if(rand == 1) sprite = 'muzzleParticle2';
	else sprite = 'muzzleParticle2';

	Phaser.Sprite.call(this, game, player.x + (Math.cos(player.rotation)*32), player.y + (Math.sin(player.rotation)*32), sprite);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

	//set additional properties
	toPointer(this, game.rnd.integerInRange(200,400), undefined, undefined, 0.5);	
	this.timeCreated = game.time.now;	

	//set random scale
	this.scale.setTo(0.6);

	//set random angular velocity

}

MuzzleParticle.prototype = Object.create(Phaser.Sprite.prototype);
MuzzleParticle.prototype.constructor = MuzzleParticle;

MuzzleParticle.prototype.update = function() {
	if(game.time.now > this.timeCreated + 55) {
		this.destroy();
	}
}

function muzzleParticleExplosion() {
	for(var i=0; i<20; i++) {
		new MuzzleParticle(game, player);
	}
}