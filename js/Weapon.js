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
	this.direction = 1;
	this.type = type;
}



Weapon.prototype = Object.create(Phaser.Sprite.prototype);
Weapon.constructor = Weapon;

Weapon.prototype.update = function() {
	//WEAPON BOB PHYSICS
	//Utilizes anchor points to make an object bob up and down
	//The object will bob slower near its min and max heights
	if(this.anchor.y>=0.5){
		this.anchor.y+=(0.75-this.anchor.y)/30*this.direction;
	} else if (this.anchor.y<0.5){
		this.anchor.y+=(this.anchor.y-0.25)/30*this.direction;
	}
	if(this.anchor.y>=0.7) this.direction = -1; //reverses direction
	if(this.anchor.y<=0.3) this.direction = 1; //reverses direction

	if (distance(player, this) < 50 && game.input.keyboard.justPressed(Phaser.Keyboard.E)) {
		player.currentWeapon = this.type;
		player.secondWeapon = 'PISTOL';
		
		// Rifle
		if (this.type === 'RIFLE') {
			player.ammo = 30;
			player.fireRate = 125;
		}
		
		// Shotgun
		else if (this.type === 'SHOTGUN') {
			player.ammo = 12;
			player.fireRate = 1000;
		}

		else if (this.type === 'SMG') {
			player.ammo = 50;
			player.fireRate = 50;
		}
		
		this.destroy();
	}
}