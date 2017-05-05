//Player prefab

function Player(game, x, y, atlas, frame, health) {

	Phaser.Sprite.call(this, game, x, y, atlas, frame);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.anchor.set(0.5);

	//Player properties
    this.hp = health;
    this.pistolFireRate = 500;
    this.pistolNextFire = 0;
    this.movementSpeed = 300;
    this.movingUp = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.movingRight = false;
    this.body.drag.x = 800; //TESTCODE
    this.body.drag.y = 800; //TESTCODE
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

    //make the player face the mouse
    this.rotation = game.physics.arcade.angleToPointer(this);

    //shoot on mouse click
    if(game.input.activePointer.isDown) shootPistol(this);
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
	player.body.velocity.y = player.movementSpeed*-1;
	player.movingUp = true;
	player.movingDown = false;
}

function moveDown(player) {
	player.body.velocity.y = player.movementSpeed;
	player.movingDown = true;
	player.movingUp = false;
}

function moveLeft(player) {
	player.body.velocity.x = player.movementSpeed*-1;
	player.movingLeft = true;
	player.movingRight = false;
}

function moveRight(player) {
	player.body.velocity.x = player.movementSpeed;
	player.movingRight = true;
	player.movingLeft = false;
}

function shootPistol(player) {
    if(game.time.now > player.pistolNextFire) {
    	knockback(player,150,player.rotation);//TEST CODE FOR KNOCK BACK
        player.pistolNextFire = game.time.now + player.pistolFireRate;
        var bullet = new Bullet(game, player.x, player.y, 'atlas', 'bullet0001', 1);
    }
}

