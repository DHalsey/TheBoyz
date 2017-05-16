//EnemySpawner.js

//EnemySpawner constructor:
//Usage: spawnerName = new EnemySpawner([array of enemy names (strings)], [array of SpawnPoints], player)
//NOTE: THE ARRAY OF ENEMY NAMES HAS TO BE <= TO THE LENGTH OF THE SPAWN POINTS ARRAY!!!!
//NOTE: YOU CAN PASS IT MORE SPAWN POINTS THAN ENEMIES, AND IT WILL WORK AS EXPECTED
//      this is a good way to create some extra randomness
function EnemySpawner(enemyArray, spawnPoints, player) {
	this.enemies = enemyArray;
	this.spawns = spawnPoints;
    this.playerSprite = player;
    this.spawned = false;
    this.enemiesAlive = enemyArray.length;
    this.addedToEscapePoint = false;
}

//Spawn function
//Usage: spawnerName.spawn();
//this function will spawn the enemies stored in the EnemySpawner enemies array at spawn points stored in the spawns array
//This function will only spawn the enemies if they have never been spawned before. If it is called again after enemies were spawned once, it will not respawn them
EnemySpawner.prototype.spawn = function() {
   if(!this.spawned) {
        shuffleArray(this.enemies);
        shuffleArray(this.spawns);

        var point;
        var enemy;

        for(var i=0; i<this.enemies.length; i++) {

            point = this.spawns[i];

            if(this.enemies[i] === "BasicCharger") {
                enemy = new BasicCharger(game, point.xCoord, point.yCoord, this.playerSprite, this);
            } else if(this.enemies[i] === "BasicShooter") {
                enemy = new BasicShooter(game, point.xCoord, point.yCoord, this.playerSprite, this);
            } else if(this.enemies[i] === "TankyCharger") {
                enemy = new TankyCharger(game, point.xCoord, point.yCoord, this.playerSprite, this);
            } else if(this.enemies[i] == "FastCharger") {
                enemy = new FastCharger(game, point.xCoord, point.yCoord, this.playerSprite, this);
            } else {
                enemy = new MissileLauncher(game, point.xCoord, point.yCoord, this.playerSprite, this);
            }
            enemyGroup.add(enemy);
        }
        this.spawned = true;
   }
}

//SpawnPoint constructor
//Usage: pointName = new SpawnPoint(x, y)
//room tiles start at [0,0] Note the +32 is to deal with an anchor offset of 0.5 so the enemy will spawn in the center of the tile
function SpawnPoint(x,y) {
    this.xCoord = x*64+32;
    this.yCoord = y*64+32;
}

//this function randomizes the order of an array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
