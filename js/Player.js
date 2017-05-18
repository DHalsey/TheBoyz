//Player prefab

function Player(game, x, y, atlas, frame, health) {

	//Phaser.Sprite.call(this, game, x, y, atlas, frame);
	Phaser.Sprite.call(this,game,x,y,'player');
	this.angle=90;
	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = false;
	this.anchor.set(0.5);
	this.body.setSize(40,40,12,4); //centers the player's hitbox

	//Player properties
    this.hp = health;
	this.maxHP = health;
    this.movementSpeed = 40;
    this.maxVelSoft = 300; //soft cap on velocity for WASD movement
    this.maxVelHard = 400; //hard cap on velocity that does not allow the player to move faster than
    this.currentRoom = 1;
    this.timeSwitched = 0;
    this.roomsVisited = new Array(0);

    //Player movement properties
    this.movingUp = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.movingRight = false;
    this.body.drag.x = 800; //TESTCODE
    this.body.drag.y = 800; //TESTCODE

    //Player weapon properties
    this.pistolFireRate = 500;
    this.nextFire = 0;
    this.fireRate = 0;
    this.currentWeapon = 'PISTOL';
    this.secondWeapon = '';
    this.ammo = 0;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	//update the player movement
    resetMovement(this);

    //WASD movement
    if(game.input.keyboard.isDown(Phaser.Keyboard.W)) moveUp(this);

    if(game.input.keyboard.isDown(Phaser.Keyboard.S)) moveDown(this);

    if(game.input.keyboard.isDown(Phaser.Keyboard.A)) moveLeft(this);

    if(game.input.keyboard.isDown(Phaser.Keyboard.D)) moveRight(this);

    //Swap weapon
    if (game.input.keyboard.justPressed(Phaser.Keyboard.Q)) swap(this);

    //make the player face the mouse
    this.rotation = game.physics.arcade.angleToPointer(this);

    //shoot on mouse click
    if(game.input.activePointer.isDown) shootWeapon(this);

    //handle collision between bullets and player
    game.physics.arcade.overlap(this, enemyBullets, bulletsPlayerCollision, null, this);

    //collision between player and missiles
    game.physics.arcade.overlap(this, enemyMissiles, missilesPlayerCollision, null, this);

    if(this.hp <= 0)
        game.state.start('Lose');
}

Player.prototype.logRoomSwitch = function(room) {
    if(!this.roomVisited(room)) {
        this.timeSwitched = game.time.now;
        this.roomsVisited.push(room);
    }
    if(this.currentRoom != room) this.currentRoom = room;
}

Player.prototype.roomVisited = function(room) {
    var returnValue = false;
    for(var i=0; i<this.roomsVisited.length; i++) {
        if(this.roomsVisited[i] == room) {
            return true;
        }
    }
    return false;
}

function resetMovement(player) {
	//player.body.velocity.x = 0;
	//player.body.velocity.y = 0;

	player.movingUp = false;
	player.movingDown = false;
	player.movingLeft = false;
	player.movingRight = false;
}

function moveUp(player) {
	//accelerates player up to a cap (this implementation allows knockback to occur while moving)
	if (player.body.velocity.y>-player.maxVelSoft){
		player.body.velocity.y -= player.movementSpeed;
	}
	player.movingUp = true;
	player.movingDown = false;
}

function moveDown(player) {
	//accelerates player up to a cap (this implementation allows knockback to occur while moving)
	if (player.body.velocity.y<player.maxVelSoft){
		player.body.velocity.y += player.movementSpeed;
	}
	player.movingDown = true;
	player.movingUp = false;
}

function moveLeft(player) {
	//accelerates player up to a cap (this implementation allows knockback to occur while moving)
	if (player.body.velocity.x>-player.maxVelSoft){
		player.body.velocity.x -= player.movementSpeed;
	}
	player.movingLeft = true;
	player.movingRight = false;
}

function moveRight(player) {
	//accelerates player up to a cap (this implementation allows knockback to occur while moving)
	if (player.body.velocity.x<player.maxVelSoft){
		player.body.velocity.x += player.movementSpeed;
	}
	player.movingRight = true;
	player.movingLeft = false;
}

function swap(player) {
	if (player.secondWeapon != '') {
		var temp = player.currentWeapon;
		player.currentWeapon = player.secondWeapon;
		player.secondWeapon = temp;
		console.log('Weapon: ' + player.currentWeapon);
	}

}

function shootWeapon(player) {
    if (player.currentWeapon == 'PISTOL' && game.time.now > player.nextFire) {
    	knockback(player,150,player.rotation);//TEST CODE FOR KNOCK BACK
        pistolAud.play();
        player.nextFire = game.time.now + player.pistolFireRate;
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', 1, player, 400);
    }

    if (player.currentWeapon == 'RIFLE') shootRifle(player);

    if (player.currentWeapon == 'SHOTGUN') shootShotgun(player);
}

function shootRifle(player) {
    if (game.time.now > player.nextFire && player.ammo > 0) {
        knockback(player, 150, player.rotation);
        player.nextFire = game.time.now + player.fireRate;
        rifleAud.play();
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', 1, player, 200);
        player.ammo--;
    }
}

function shootShotgun(player) {
    if (game.time.now > player.nextFire && player.ammo > 0) {
        knockback(player, 400, player.rotation);
        player.nextFire = game.time.now + player.fireRate;
        shotgunAud.play();
        
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', .5, player, 800);
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', .5, player, 800);
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', .5, player, 800);
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', .5, player, 800);
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', .5, player, 800);
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', .5, player, 800);
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', .5, player, 800);
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', .5, player, 800);
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', .5, player, 800);
        new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', .5, player, 800);
        
        player.ammo--;
    }
}

//handle collision between bullets group and player
function bulletsPlayerCollision(player, bullet) {
    bullet.destroy();
    player.hp -= bullet.damage;

    //knock back the player based on the bullet's trajectory
    player.knockedBack = true;
    knockback(player, 300, bullet.rotation - Math.PI);
    console.log('Player HP: ' + player.hp);
}

//handle collision between bullets group and player
function missilesPlayerCollision(player, missile) {
    player.hp -= missile.damage;
    //knock back the player based on the bullet's trajectory
    player.knockedBack = true;
    knockback(player, 600, missile.rotation - Math.PI);
    console.log('Player HP: ' + player.hp);

    destroyMissile(missile);
}

