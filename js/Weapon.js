// Weapon Prefab
// Parameters: 
// 		game: current game object
//		x, y: x, y coordinates in game
//		sprite: weapon's sprite (subject to change to 'atlas', 'key')
// 		type: type of weapon (i.e. 'rifle')
//		player: player, duh

function Weapon(game, x, y, sprite, type, player) {
	
	Phaser.Sprite.call(this, game, x, y, sprite);
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.type = type;
}

Weapon.prototype = Object.create(Phaser.Sprite.prototype);
Weapon.constructor = Weapon;

Weapon.prototype.update = function() {
	if (distance(player, this) < 50 && game.input.keyboard.justPressed(Phaser.Keyboard.E)) {
		player.currentWeapon = this.type;
		player.secondWeapon = 'PISTOL';
		
		// Rifle
		if (this.type == 'RIFLE') {
			player.ammo = 50;
			player.fireRate = 100;
		}
		
		// Shotgun
		else if (this.type == 'SHOTGUN') {
			player.ammo = 12;
			player.fireRate = 1000;
		}
		
		this.destroy();
	}
}