//debug.js
//Place any useful debug info here
function debugCreate(){
	
	var testMissile
	testMissile = new EnemySpawner(['enemyMissiles'], [new SpawnPoint(10,6)], player);
	testMissile.spawn();
	var rifle = new Weapon(game, room_width/2, room_height/2, 'rifleSprite', 'RIFLE', player);
    var shotgun = new Weapon(game, room_width/2 + 100, room_height/2, 'shotgunSprite', 'SHOTGUN', player);
    var smg = new Weapon(game, room_width/2 + 200, room_height/2, 'smgSprite', 'SMG', player);
	

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