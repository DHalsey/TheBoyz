// Weapon Prefab
// Parameters: 
// 		game: current game object
//		x, y: x, y coordinates in game
//		sprite: weapon's sprite (subject to change to 'atlas', 'key')
// 		type: type of weapon (i.e. 'rifle')
//		fireRate: weapon's rate of fire
//		player: player, duh

function Weapon(game, x, y, sprite, type, fireRate, player) {
	
	Phaser.Sprite.call(this, game, x, y, sprite);
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.type = type;
	this.fireRate = fireRate;
}

Weapon.prototype = Object.create(Phaser.Sprite.prototype);
Weapon.constructor = Weapon;

Weapon.prototype.update = function() {
	if (distance(player, this) < 50 && game.input.keyboard.justPressed(Phaser.Keyboard.E)) {
		player.currentWeapon = this.type;
		player.secondWeapon = 'PISTOL';
		player.fireRate = this.fireRate;
		player.ammo = 50;
		this.kill();
	}
}