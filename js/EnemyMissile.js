//EnemyMissile prefab
function EnemyMissile(game, x, y, atlas, frame, damage, player, emitter) {
	Phaser.Sprite.call(this, game, x, y, atlas, frame);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.setSize(16,16,8,4); //centers the missile's hitbox
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
	this.timeCreated = game.time.now;
	this.type = 'MISSILE';
	//add to the bullets group
	enemyMissiles.add(this);

}

EnemyMissile.prototype = Object.create(Phaser.Sprite.prototype);
EnemyMissile.prototype.constructor = EnemyMissile;

EnemyMissile.prototype.update = function() {
		//create particle tail
		new MissileTail(game, this);

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

		//manually check collision between this missile and all alive playerBullets 
		for(var i=0; i< playerBullets.children.length;i++) {
			bullet = playerBullets.children[i];
			if(Phaser.Rectangle.intersects(bullet.getBounds(), this.getBounds())) {
				missileBulletCollision(this, bullet);
				break;
			}
		}
		
		for(var j=0; j<enemyGroup.children.length;j++) {
			enemy = enemyGroup.children[j];
			if(distance(enemy, this) <= 35 && game.time.now > this.timeCreated + 500) {
				for (var k = 0; k < 9; k++) makeBloodParticles(this, enemy);
				destroyMissile(this);
			}
		}
}

//missile particle trail
//MissileTail prefab
function MissileTail(game, missile) {
	if(missile.body != null) {
		var rand = game.rnd.integerInRange(1,10);
		var sprite = '';

		if(rand == 1) sprite = 'missileParticle1';
		else if(rand == 2) sprite = 'missileParticle4';
		else sprite = 'missileParticle3';

		if(missile.body!=null)Phaser.Sprite.call(this, game, missile.x, missile.y, sprite);

		//add to the game
		game.add.existing(this);

		//enable physics and set some properties
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.anchor.set(0.5);

		//set additional properties
		
		this.missile = missile;
		this.rotation = missile.rotation - Math.PI;
		this.rotation += game.rnd.realInRange(-(Math.PI/8), (Math.PI/8));
		this.timeCreated = game.time.now;
		this.fading = false;

		game.physics.arcade.velocityFromRotation(this.rotation, game.rnd.integerInRange(200,300), this.body.velocity);	

		//set random scale
		rand = game.rnd.realInRange(0.5, 1.3);
		this.scale.setTo(rand);
	}
}

MissileTail.prototype = Object.create(Phaser.Sprite.prototype);
MissileTail.prototype.constructor = MissileTail;

MissileTail.prototype.update = function() {
	if(game.time.now > this.timeCreated + 400) {
		this.destroy();
	}
}


function destroyMissile(missile) {
   missileParticleExplosion(missile)
   missileExplosionAud.play();

   if(distance(player, missile) <= 120) {
   	player.hp -= game.rnd.integerInRange(1,2);
   	playerHit.play();
    game.camera.shake(0.016, 100);
   }

   enemyMissiles.remove(missile);
   for(var i=0; i<enemyMissiles.children.length; i++) {
   		var missile2 = enemyMissiles.children[i];
   		if(distance(missile, missile2) <= 125) {
   			game.time.events.add(Phaser.Timer.SECOND * .1, destroyMissile, this, missile2);
   			break;
   		}
   }

   missile.destroy();
}

function missileParticleExplosion(missile) {
	for(var i=0; i<40; i++) {
		new MissileParticle(game, missile);
	}
}

function missileBulletCollision(missile, bullet) {
	bulletsHit++;
	destroyMissile(missile);
	bullet.destroy();
}

