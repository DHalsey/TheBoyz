function BloodParticle(bullet, enemy, size) {
	
	Phaser.Sprite.call(this, game, enemy.x - (Math.cos(enemy.rotation)*32), enemy.y - (Math.sin(enemy.rotation)*32), 'bloodParticle');
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	bloodParticles.add(this);

	this.movementSpeed = 500;
	this.scale.setTo(size);
	this.startTime = game.time.now;
	this.spread = 0.5;
	this.angleVel = bullet.angleVel;

	shootParticle(this, this.angleVel, this.movementSpeed, this.spread);
	game.add.tween(this).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, false);
}

BloodParticle.prototype = Object.create(Phaser.Sprite.prototype);
BloodParticle.prototype.constructor = BloodParticle;

BloodParticle.prototype.update = function() {
	if(game.time.now > this.startTime + 150) {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}

	if(this.alpha <= 0) {
		this.destroy();
	}
}

function shootParticle(bloodParticle, angle, speed, spread) {

	bloodParticle.body.velocity.x = ((Math.cos(angle) + game.rnd.realInRange(-spread, spread)) * speed);
    bloodParticle.body.velocity.y = ((Math.sin(angle) + game.rnd.realInRange(-spread, spread)) * speed);
}

function makeBloodParticles(bullet, enemy) {
    var randNum = game.rnd.integerInRange(1, 5);
    var size;

    for (i=0;  i<randNum; i++) {
        size = game.rnd.realInRange(1, 3);
        new BloodParticle(bullet, enemy, size);
    }
}