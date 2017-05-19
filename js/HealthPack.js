//HealthPack.js
function HealthPack(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'healthOverlay');
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.restoreValue = game.rnd.integerInRange(2,4);
}

HealthPack.prototype = Object.create(Phaser.Sprite.prototype);
HealthPack.prototype.constructor = HealthPack;

HealthPack.prototype.update = function() {
	//collision between player and health pack
	game.physics.arcade.overlap(this, player, playerHealthPackCollision, null, this);
}

function playerHealthPackCollision(pack, player) {
	player.hp += pack.restoreValue;
	if(player.hp > player.maxHP) player.hp = player.maxHP;
	pack.destroy();
}