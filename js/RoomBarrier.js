//RoomBarrier.js

//RoomBarrier constructor
//Usage: exampleBarrier = new RoomBarrier(game, tile-x-coordinate, tile-y-coordinate, player, spawner)
//You must tie each barrier with an enemy spawner object
//The barriers will despawn once all enemies associeated with that spawner have been killed
function RoomBarrier(game, x, y, player, spawner) {

	Phaser.Sprite.call(this, game, x*64+32, y*64+32, 'wall');

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
    this.playerSprite = player;
    this.enemySpawner = spawner;

    //properties
    this.body.immovable = true;

}

RoomBarrier.prototype = Object.create(Phaser.Sprite.prototype);
RoomBarrier.prototype.constructor = RoomBarrier;

RoomBarrier.prototype.update = function() {
    //collision with player
    game.physics.arcade.collide(this.playerSprite, this);

    //collision with enemies
    game.physics.arcade.collide(this, enemyGroup);

    //destroy once all enemies are dead
	if(this.enemySpawner.enemiesAlive <= 0) this.destroy();
}