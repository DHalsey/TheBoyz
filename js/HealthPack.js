//HealthPack.js
function HealthPack(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'healthOverlay');
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.restoreValue = game.rnd.integerInRange(2,3);
	this.direction = 1;
}

HealthPack.prototype = Object.create(Phaser.Sprite.prototype);
HealthPack.prototype.constructor = HealthPack;

HealthPack.prototype.update = function() {
	//bobbing effect
	if(this.anchor.y>=0.5){
		this.anchor.y+=(0.75-this.anchor.y)/30*this.direction;
	} else if (this.anchor.y<0.5){
		this.anchor.y+=(this.anchor.y-0.25)/30*this.direction;
	}
	if(this.anchor.y>=0.7) this.direction = -1; //reverses direction
	if(this.anchor.y<=0.3) this.direction = 1; //reverses direction
	//collision between player and health pack
	game.physics.arcade.overlap(this, player, playerHealthPackCollision, null, this);
}

function playerHealthPackCollision(pack, player) {
	player.hp += pack.restoreValue;
	if(player.hp > player.maxHP) player.hp = player.maxHP;
	pack.destroy();
}