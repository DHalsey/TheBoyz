//bullet prefab
function Bullet(game, x, y, atlas, frame, damage, player, knockback, spread) {
	var rand = game.rnd.integerInRange(1,2);
	var sprite = 'bulletLine';
	if(rand == 1) sprite = 'bulletLine2';
	Phaser.Sprite.call(this, game, player.x + (Math.cos(player.rotation)*32), player.y + (Math.sin(player.rotation)*32), sprite);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

    //properties that allow bullets to be destroyed at world bounds
    this.body.collideWorldBounds = true;
    this.body.onWorldBounds = new Phaser.Signal();
    this.body.onWorldBounds.add(destroyBullet, this);

	//set additional properties
	this.movementSpeed = 3000;
	this.damage = damage;
	this.knockbackValue = knockback;
	this.startTime = game.time.now;
	this.currentWeapon = player.currentWeapon;
	this.fading = false;
	this.spread = spread;

	this.rotation = player.rotation;

	//add to the bullets group
	playerBullets.add(this);

	//make the bullet fire at the pointer
	this.angleVel = toPointer(this, this.movementSpeed, undefined, undefined, this.spread);

	//make bullet face mouse
	this.rotation = game.physics.arcade.angleToPointer(this);

	if(this.currentWeapon != 'SHOTGUN') this.scale.setTo(3,1);
	else this.scale.setTo(2,1);

	if(this.currentWeapon != 'SHOTGUN') {
		if(sprite == 'bulletLine') this.alpha = .60;
		else this.alpha = .75;
		//create bullet shell
		new BulletShell(game, player);
	}
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;


Bullet.prototype.update = function() {
	if(this.currentWeapon === 'SHOTGUN') {
		if(game.time.now > this.startTime + 150) {
			this.destroy();
		} else {
           fadeBullet(this);
		} 
	}
}

function destroyBullet(bullet) {
   bullet.destroy();
}


function fadeBullet(bullet) {
	if(!bullet.fading){
		game.add.tween(bullet).to( { alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
		bullet.fading = true;
	}
}