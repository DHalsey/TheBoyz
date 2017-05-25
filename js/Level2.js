//Level2.js

var Level2 = function(game) {
  var room1Wave1, room1Wave2;
  var room2Wave1, room2Wave2, room2Wave3, room2RangedWave1, room2RangedWave3;
  var room3Wave1, room3Wave2, room3Wave3;
  var room4Wave1, room4Wave2, room4Wave3, room4PointArray;
  var escape, healthBar;
  var roomOneBarriersCreated, roomTwoBarriersCreated, roomThreeBarriersCreated, roomFourBarriersCreated
  var roomFiveBarriersCreated, roomSixBarriersCreated, roomSevenBarriersCreated, roomEightBarriersCreated;
  var barrierDelay;
};
Level2.prototype = {
    preload: function(){
	},
	create: function(){
        world_width = 2560; //The world has been set to be 2x2 rooms big
        world_height= 3072;
        room_width = 1280;
        room_height= 768;

        //start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set world size and adjust color to white
        game.stage.setBackgroundColor('#ffffff');
        game.world.setBounds(0,0,world_width,world_height);

        console.log("in level2.js"); //temp
		levelSelect(2);

        //create groups
        playerBullets = game.add.physicsGroup();
        enemyBullets = game.add.physicsGroup();
        enemyGroup = game.add.physicsGroup();
        enemyMissiles = game.add.physicsGroup();

        player = new Player(game, (3*64)+32, (1*64)+32, 200, 'atlas', 'player0001', 10);
        //update the player's stats
        updateStats(player, statChanger);

        //room 1 spawners
        room1Wave1 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'BasicShooter'], [new SpawnPoint(7,9), new SpawnPoint(11,10), new SpawnPoint(12,3), new SpawnPoint(14,5), new SpawnPoint(18,6)], player);
        room1Wave2 = new EnemySpawner(['FastCharger', 'BasicCharger', 'FastCharger', 'BasicShooter'], [new SpawnPoint(2,5), new SpawnPoint(5,2), new SpawnPoint(5,9), new SpawnPoint(13,10), new SpawnPoint(17,2)], player);

        //room 2 spawners
        room2RangedWave1 = new EnemySpawner(['BasicShooter', 'MissileLauncher'],[new SpawnPoint(21,0), new SpawnPoint(21,10)],player);
        room2Wave1 = new EnemySpawner(['BasicCharger','FastCharger'], [new SpawnPoint(24,10), new SpawnPoint(24,1), new SpawnPoint(35,4), new SpawnPoint(38,7)], player);
        room2Wave2 = new EnemySpawner(['TankyCharger', 'TankyCharger', 'TankyCharger', 'TankyCharger'], [new SpawnPoint(24,10), new SpawnPoint(24,1), new SpawnPoint(35,4), new SpawnPoint(29,1), new SpawnPoint(38,7)], player);
        room2RangedWave3 = new EnemySpawner(['BasicShooter', 'MissileLauncher'], [new SpawnPoint(21,0), new SpawnPoint(21,10)], player);
        room2Wave3 = new EnemySpawner(['FastCharger', 'BasicCharger'], [new SpawnPoint(23,1), new SpawnPoint(25,10), new SpawnPoint(28,3), new SpawnPoint(31,9), new SpawnPoint(35,7)], player);

        //room 3 spawners
        room3Wave1 = new EnemySpawner(['MissileLauncher', 'BasicShooter', 'BasicShooter'],[new SpawnPoint(1,23), new SpawnPoint(13,23), new SpawnPoint(12,14)], player);
        room3Wave2 = new EnemySpawner(['BasicCharger','TankyCharger','BasicCharger'], [new SpawnPoint(3,12), new SpawnPoint(3,14), new SpawnPoint(3,16)], player);
        room3Wave3 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'FastCharger'], [new SpawnPoint(13,19), new SpawnPoint(15,19), new SpawnPoint(17,19)], player);

        //room 4 spawners
        room4PointArray = new Array(new SpawnPoint(22,13), new SpawnPoint(25,15), new SpawnPoint(26,21), new SpawnPoint(27,14),
                                    new SpawnPoint(27,19), new SpawnPoint(29,15), new SpawnPoint(29,21), new SpawnPoint(30,18),
                                    new SpawnPoint(33,13), new SpawnPoint(33,16), new SpawnPoint(33,19), new SpawnPoint(36,17));
        room4Wave1 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'TankyCharger', 'FastCharger'], room4PointArray, player);
        room4Wave2 = new EnemySpawner(['BasicCharger', 'FastCharger', 'FastCharger', 'FastCharger'], room4PointArray, player);

       createHealthBar();

       level2RoomAnchors();

       // Ammo indicator
      ammoText = createAmmoText(player);

      reticle = game.add.sprite(game.input.activePointer.x - 8, game.input.activePointer.y - 8, 'reticle');
      reticle.anchor.setTo(0.5);

      nextLevel = 'Level3';//temp
	},

	update: function(){

        game.physics.arcade.collide(player, layerCollision);

        game.physics.arcade.collide(enemyGroup, layerCollision);

        level2RoomTransition(player, room_width, room_height);
        updateHealthBar();

       //Update ammoText
       updateAmmoText(ammoText, player);

       reticle.x = game.input.activePointer.x + game.camera.x;
       reticle.y = game.input.activePointer.y + game.camera.y;

    }
};
