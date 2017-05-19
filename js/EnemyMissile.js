//EnemyMissile prefab
function EnemyMissile(game, x, y, atlas, frame, damage, player, emitter) {
	Phaser.Sprite.call(this, game, x, y, atlas, frame);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

    //properties that allow bullets to be destroyed at world bounds
    this.body.collideWorldBounds = true;
    this.body.onWorldBounds = new Phaser.Signal();
    this.body.onWorldBounds.add(destroyMissile, this, emitter);

	//set additional properties
	this.movementSpeed = 300;
	this.damage = damage;
	this.targetingTimer = 200;
	this.nextTarget = 0;
	this.playerSprite = player;
	this.rotation = angleToSprite(this, this.playerSprite);
	//add to the bullets group
	enemyMissiles.add(this);

	//temporarily scale the bullet sprite
	this.scale.setTo(4,4);
}

EnemyMissile.prototype = Object.create(Phaser.Sprite.prototype);
EnemyMissile.prototype.constructor = EnemyMissile;

EnemyMissile.prototype.update = function() {
		bulletAngle = angleToSprite(this, this.playerSprite); //the angle to the player from the bullet
		//The math system i created for it is convoluted as fuck. good luck understanding it =)
		//essentially changes the angle detection to work from 0-360 instead of 0-180
		if (this.rotation - bulletAngle >3.15 || this.rotation - bulletAngle <-3.15) bulletAngle=-bulletAngle*2; //makes it always positive
		if (this.rotation - bulletAngle > 0 ) {//if the bullet needs to turn right
			this.angle-=2;
		} else if (this.rotation - bulletAngle <0 ){ //if the bullet needs to turn left
			this.angle+=2;
		} 
		game.physics.arcade.velocityFromRotation(this.rotation,this.movementSpeed,this.body.velocity); //moves the bullet the direction its facing
}

function destroyMissile(missile) {
   missileParticleExplosion(missile)
   missileExplosionAud.play();
   missile.destroy();
}

function missileParticleExplosion(missile) {
	for(var i=0; i<40; i++) {
		new MissileParticle(game, missile);
	}
}