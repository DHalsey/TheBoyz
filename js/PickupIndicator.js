//PickupIndicator prefab
function PickupIndicator(game, player) {
	Phaser.Sprite.call(this, game, player.x, player.y-74, 'pressE');

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.playerSprite = player;
	this.visible = false;
}

PickupIndicator.prototype = Object.create(Phaser.Sprite.prototype);
PickupIndicator.prototype.constructor = PickupIndicator;

PickupIndicator.prototype.update = function() {
	this.x = this.playerSprite.x;
	this.y = this.playerSprite.y - 74;

	this.visible = false;
	for(var i=0; i<weaponGroup.children.length; i++) {
		var weapon = weaponGroup.children[i];
		if(distance(weapon, this.playerSprite) < 50) {
			this.visible = true;
			break;
		}
	}

	
}

function destroyIndicator(indicator) {
	indicator.destroy();
}