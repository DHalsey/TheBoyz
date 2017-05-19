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
	this.movementSpeed = 450;
	this.damage = damage;
	this.targetingTimer = 200;
	this.nextTarget = 0;
	this.playerSprite = player;

	//add to the bullets group
	enemyMissiles.add(this);

	//temporarily scale the bullet sprite
	this.scale.setTo(4,4);
}

EnemyMissile.prototype = Object.create(Phaser.Sprite.prototype);
EnemyMissile.prototype.constructor = EnemyMissile;

EnemyMissile.prototype.update = function() {
	if(game.time.now > this.nextTarget) {
		this.nextTarget = game.time.now + this.targetingTimer;
		game.physics.arcade.moveToObject(this, this.playerSprite, this.movementSpeed);
		this.rotation = angleToSprite(this, this.playerSprite);  
	}
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