//debug.js
//Place any useful debug info here
function debugCreate(){
	var testMissile
	testMissile = new EnemySpawner(['enemyMissiles'], [new SpawnPoint(18,1)], player);
	testMissile.spawn();
}

function debugUpdate(){
	game.debug.body(player);
	
}