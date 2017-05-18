//EscapePoint.js

//EscapePoint constructor
//Usage: new EscapePoint(game, [array of possible spawn points], player, the name of the state that staerts when player collides with it)
//The escape point will start the next level when the player collides with it ONLY IF all enemies in the room are dead
//in order to make this work only when all enemies are dead in a specific room, EscapePoints have to work together with enemySpawners
function EscapePoint(game, points, player) {
    shuffleArray(points);
    var point = points[0];
	Phaser.Sprite.call(this, game, point.xCoord, point.yCoord, 'wall');

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
    this.playerSprite = player;
    this.gameReference = game;
    this.possibleSpawns = points;
    this.enemySpawners = new Array(0);
    this.spawnerStatus = new Array(0);

    //properties
    this.body.immovable = true;

}

EscapePoint.prototype = Object.create(Phaser.Sprite.prototype);
EscapePoint.prototype.constructor = EscapePoint;

//call this function any time the player switches rooms
//usage: trackSpawner(EnemySpawner)
//this is here so that the escape point will only work when all enemies in the room are dead
//you can see an example of how to do this in the play state of main.js (the block of if, else ifs in the update function)
EscapePoint.prototype.trackSpawner = function(spawner) {
	if(!spawner.addedToEscapePoint) {
		this.enemySpawners.push(spawner);
		this.spawnerStatus.push(false);
		spawner.addedToEscapePoint = false;
	}
}

EscapePoint.prototype.update = function() {
	//update the status array
    for(var i=0; i<this.enemySpawners.length;i++) {
    	this.spawnerStatus[i] = checkSpawner(this.enemySpawners[i]);
    }

	//handle collision between player and EscapePoint
    game.physics.arcade.collide(this, this.playerSprite, startNewState, null, this);
}

//this function checks if all enemies in the room are dead
//if there are enemies still alive, then the escape point will not transport the player
function checkEscapeStatus(statusArray) {
	var returnValue = true;
	for(var k=0; k<statusArray.length; k++) {
        if(statusArray[k] == false)
        	returnValue = false;
	}
	return returnValue;
}

function startNewState(escapePoint, player) {
	if(checkEscapeStatus(escapePoint.spawnerStatus)) game.state.start('Upgrade');
}

