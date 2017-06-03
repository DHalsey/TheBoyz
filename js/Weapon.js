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
	this.ammoCap;
	weaponGroup.add(this);

	if(this.type === 'SHOTGUN') this.ammoCap = 8;
	if(this.type === 'RIFLE') this.ammoCap = 30;
	if(this.type === 'SMG') this.ammoCap = player.smgAmmoCap;
}

Weapon.prototype = Object.create(Phaser.Sprite.prototype);
Weapon.prototype.constructor = Weapon;

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

	if ((distance(player, this) < 50 && game.input.keyboard.justPressed(Phaser.Keyboard.E)) || 
		(distance(player, this) < 50 && player.secondWeapon != '' && player.ammo <= 0) || 
		(distance(player, this) < 50 && player.currentWeapon == this.type && player.ammo < this.ammoCap)) {

		player.currentWeapon = this.type;
		player.secondWeapon = 'PISTOL';
		gunPickup.play();

		if(!player.pickedUpFirstWeapon) {
			player.pickedUpFirstWeapon = true;
			destroyIndicator(player.pickup);
		}
		
		// Rifle
		if (this.type === 'RIFLE') {
			player.ammo = 30;
			player.fireRate = player.rifleROF;
			player.spread = 0;
		}
		
		// Shotgun
		else if (this.type === 'SHOTGUN') {
			player.ammo = 8;
			player.fireRate = 1000;
			player.spread = 0;
		}

		// SMG
		else if (this.type === 'SMG') {
			player.ammo = player.smgAmmoCap;
			player.fireRate = 50;
			player.spread = 0;
		}
		
		this.destroy();
	}
}