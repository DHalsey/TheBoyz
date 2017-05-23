//debug.js
//Place any useful debug info here
function debugCreate(){
	var testMissile
	testMissile = new EnemySpawner(['enemyMissiles'], [new SpawnPoint(18,1)], player);
	testMissile.spawn();
}

function debugUpdate(){
	/*
	game.debug.body(player);
	//game.debug.body(EscapePoint);
	groupBodyDebug(enemyMissiles);
	*/
	var keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
if(keyEnter.justPressed()) game.state.start('Upgrade');

}

//handles drawing debug bodies for groups
//pass in the desired group
function groupBodyDebug(group){
	for (var i = 0; i<group.children.length; i++) {  
		game.debug.body(group.children[i]);
	}
}