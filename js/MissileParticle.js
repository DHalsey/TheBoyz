//MissileParticle prefab
function MissileParticle(game, missile) {
	if(missile.body != null) {
		var rand = game.rnd.integerInRange(1,2);
		var sprite = '';

		if(rand == 1) sprite = 'missileParticle1';
		else sprite = 'missileParticle2';

		if(missile.body!=null)Phaser.Sprite.call(this, game, missile.body.x, missile.body.y, sprite);

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
		this.missileRotation = missile.rotation;
		this.missile = missile;

		//set random scale
		rand = game.rnd.realInRange(0.5, 1.2);
		this.scale.setTo(rand);

		//add to particles group
		missileParticles.add(this);
	}
}

MissileParticle.prototype = Object.create(Phaser.Sprite.prototype);
MissileParticle.prototype.constructor = MissileParticle;

MissileParticle.prototype.update = function() {
	if(this.missile.body != null) this.missileRotation = this.missile.rotation;

	if(game.time.now > this.startTime + 200) {
		fadeParticle(this);
	}

	if(game.time.now > this.startTime + 260) {
		this.destroy();
	}

	for(var j=0; j<enemyGroup.children.length;j++) {
			enemy = enemyGroup.children[j];
			if(distance(enemy, this) <= 35) {
				enemy.hp -= .05;
				enemy.knockedBack = true;
				enemy.body.drag.x = 1000;
				enemy.body.drag.y = 1000;
				knockback(enemy, 5, this.missileRotation-Math.PI);
			}
	}
}

function fadeParticle(particle) {
	game.add.tween(particle).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
}

function particleEnemyCollision(particle, enemy) {
	enemy.hp -= .05;
	enemy.knockedBack = true;
	enemy.body.drag.x = 1000;
	enemy.body.drag.y = 1000;
	knockback(enemy, 10, angleToSprite(particle, enemy));
}
