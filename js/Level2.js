//Level2.js

var Level2 = function(game) {
  var room1Wave1, room1Wave2;
  var room2Wave1, room2Wave2, room2Wave3, room2RangedWave1, room2RangedWave3;
  var room3Wave1, room3Wave2, room3Wave3;
  var room4Wave1, room4Wave2, room4Wave3, room4PointArray;
  var room5Wave1, room5Wave2;
  var room6Wave1, room6Wave2, room6Wave3;
  var room7Wave1, room7Wave2, room7Wave3;
  var room8Wave1, room8RangedWave1, room8Wave2, room8RangedWave2;
  var escape, healthBar;
  var roomOneBarriersCreated, roomTwoBarriersCreated, roomThreeBarriersCreated, roomFourBarriersCreated;
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

        //Hide mouse cursor
        document.body.style.cursor = 'none';

        playMusic.loopFull();

        //start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set world size and adjust color to white
        game.stage.setBackgroundColor('#ffffff');
        game.world.setBounds(0,0,world_width,world_height);

		levelSelect(2);

        //create groups
        bloodParticles = game.add.physicsGroup();
        weaponGroup = game.add.group();
        enemyGroup = game.add.physicsGroup();
        playerBullets = game.add.physicsGroup();
        enemyBullets = game.add.physicsGroup();
        enemyMissiles = game.add.physicsGroup();
        missileParticles = game.add.physicsGroup();
        
        barriers = game.add.group();

        player = new Player(game, (3*64)+32, (1*64)+32, 200, 'atlas', 'player0001', 15);

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
        room4Wave3 = new EnemySpawner(['FastCharger', 'TankyCharger', 'TankyCharger', 'TankyCharger'], room4PointArray, player);

        //room 5 spawners
        room5Wave1 = new EnemySpawner(['MissileLauncher', 'MissileLauncher', 'MissileLauncher', 'BasicShooter', 'BasicShooter'], [new SpawnPoint(0,27), new SpawnPoint(0,34), new SpawnPoint(2,26), new SpawnPoint(2,28), new SpawnPoint(2,33), new SpawnPoint(7,30), new SpawnPoint(11,26), new SpawnPoint(11, 34)], player);
        room5Wave2 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'TankyCharger', 'TankyCharger', 'BasicShooter'], [new SpawnPoint(3,27), new SpawnPoint(4,34), new SpawnPoint(7,31), new SpawnPoint(10,28), new SpawnPoint(14,30), new SpawnPoint(18,27), new SpawnPoint(18,33)], player);

        //room 6 spawners
        room6Wave1 = new EnemySpawner(['FastCharger', 'FastCharger', 'BasicShooter', 'BasicShooter'], [new SpawnPoint(24,27), new SpawnPoint(25,32), new SpawnPoint(27,33), new SpawnPoint(30,33), new SpawnPoint(33,32), new SpawnPoint(36, 29)], player);
        room6Wave2 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'BasicCharger', 'BasicCharger', 'BasicCharger', 'BasicCharger'], [new SpawnPoint(24,26), new SpawnPoint(25,32), new SpawnPoint(30,25), new SpawnPoint(30,33), new SpawnPoint(35,27), new SpawnPoint(36,29)], player);
        room6Wave3 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'BasicCharger', 'BasicCharger', 'TankyCharger', 'TankyCharger'], [new SpawnPoint(24,26), new SpawnPoint(25,32), new SpawnPoint(30,25), new SpawnPoint(30,33), new SpawnPoint(35,27), new SpawnPoint(36,29)], player);


        //room 7 spawners
        room7Wave1 = new EnemySpawner(['MissileLauncher', 'MissileLauncher', 'MissileLauncher', 'MissileLauncher'], [new SpawnPoint(3,41), new SpawnPoint(5,47), new SpawnPoint(9,47), new SpawnPoint(13,47)], player);
        room7Wave2 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'BasicCharger', 'TankyCharger', 'TankyCharger'], [new SpawnPoint(4,38), new SpawnPoint(6,45), new SpawnPoint(7,41), new SpawnPoint(9,37), new SpawnPoint(14,45), new SpawnPoint(17,38), new SpawnPoint(17,42), new SpawnPoint(18,45)], player);
        room7Wave3 = new EnemySpawner(['TankyCharger', 'TankyCharger', 'TankyCharger', 'TankyCharger', 'BasicCharger'], [new SpawnPoint(4,38), new SpawnPoint(6,45), new SpawnPoint(7,41), new SpawnPoint(9,37), new SpawnPoint(14,45), new SpawnPoint(17,38), new SpawnPoint(17,42), new SpawnPoint(18,45)], player);


        //room 8 spawners
        room8RangedWave1 = new EnemySpawner(['MissileLauncher'], [new SpawnPoint(37,45)], player);
        room8Wave1 = new EnemySpawner(['FastCharger', 'FastCharger', 'TankyCharger'], [new SpawnPoint(21,39), new SpawnPoint(23,42), new SpawnPoint(28,45), new SpawnPoint(37,42), new SpawnPoint(37,37)], player);
        room8RangedWave2 = new EnemySpawner(['BasicShooter'], [new SpawnPoint(37,45)], player);
        room8Wave2 = new EnemySpawner(['TankyCharger', 'TankyCharger', 'TankyCharger', 'TankyCharger'], [new SpawnPoint(21,42), new SpawnPoint(23,39), new SpawnPoint(27,38), new SpawnPoint(32,37), new SpawnPoint(35,38), new SpawnPoint(37,39)], player);

        //spawn in the escape point
        escape = new EscapePoint(game, [new SpawnPoint(38,6), new SpawnPoint(18,26), new SpawnPoint(2, 33), new SpawnPoint(2,37), new SpawnPoint(2,37)], player);

       createHealthBar();

       level2RoomAnchors();

       roomOneBarriersCreated = false;
       roomTwoBarriersCreated = false;
       roomThreeBarriersCreated = false;
       roomFourBarriersCreated = false;
       roomFiveBarriersCreated = false;
       roomSixBarriersCreated = false;
       roomSevenBarriersCreated = false;
       roomEightBarriersCreated = false;


       // Ammo indicator
      ammoText = createAmmoText(player);

      reticle = game.add.sprite(game.input.activePointer.x - 8, game.input.activePointer.y - 8, 'reticle');
      reticle.anchor.setTo(0.5);

      createInGameScore();
      displayGreencards();
      currentLevelGreencards = greencards;
	},

	update: function(){
    //debugUpdate();
    updateInGameScore();
    updateGreencards();
        game.physics.arcade.collide(player, layerCollision);

        game.physics.arcade.collide(enemyGroup, layerCollision);

        level2RoomTransition(player, room_width, room_height);
        updateHealthBar();

       //Update ammoText
       updateAmmoText(ammoText, player);

       reticle.x = game.input.activePointer.x + game.camera.x;
       reticle.y = game.input.activePointer.y + game.camera.y;


       //if the player switches rooms, update the escape point so that it tracks that room's spawners
        //also spawn that room's enemies
        if(player.currentRoom == 1) {
          //spawn first wave
          room1Wave1.spawn();

          //spawn second wave
          if(room1Wave1.enemiesAlive <= 0) {
            room1Wave2.spawn();
          }

          //spawn room barriers
          if(!roomOneBarriersCreated) {
            new RoomBarrier(game, 2,12, player, room1Wave1, room1Wave2);
            new RoomBarrier(game, 3,12, player, room1Wave1, room1Wave2);
            new RoomBarrier(game, 4,12, player, room1Wave1, room1Wave2);
            roomOneBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 2) {
          //spawn first wave
          room2RangedWave1.spawn();
          room2Wave1.spawn()
          //make the escape point track this room's spawners
          escape.trackSpawner(room2RangedWave1);
          escape.trackSpawner(room2Wave1);
          escape.trackSpawner(room2Wave2);
          escape.trackSpawner(room2RangedWave3);
          escape.trackSpawner(room2Wave3);

          //spawn second wave
          if(room2RangedWave1.enemiesAlive <= 0 && room2Wave1.enemiesAlive <= 0) {
            room2Wave2.spawn();
          }

          //spawn third wave
          if(room2Wave2.enemiesAlive <= 0) {
            room2Wave3.spawn();
            room2RangedWave3.spawn();
          }

          //spawn in room 2 barriers
          if(!roomTwoBarriersCreated) {
            new RoomBarrier(game, 32, 12, player, room2RangedWave1, room2Wave1, room2Wave2, room2Wave3, room2RangedWave3);
            new RoomBarrier(game, 33, 12, player, room2RangedWave1, room2Wave1, room2Wave2, room2Wave3, room2RangedWave3);
            roomTwoBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 3) {
          room3Wave1.spawn();

          if(room3Wave1.enemiesAlive <= 0) {
            room3Wave2.spawn();
          }

          if(room3Wave2.enemiesAlive <= 0) {
            room3Wave3.spawn();
          }

          if(!roomThreeBarriersCreated) {

            //barriers on the top of room 3
            new RoomBarrier(game, 2, 11, player, room3Wave1, room3Wave2, room3Wave3);
            new RoomBarrier(game, 3, 11, player, room3Wave1, room3Wave2, room3Wave3);
            new RoomBarrier(game, 4, 11, player, room3Wave1, room3Wave2, room3Wave3);
            roomThreeBarriersCreated = true;

            //barriers on right side of room 3
            new RoomBarrier(game, 20, 18, player, room3Wave1, room3Wave2, room3Wave3);
            new RoomBarrier(game, 20, 19, player, room3Wave1, room3Wave2, room3Wave3);
            new RoomBarrier(game, 20, 20, player, room3Wave1, room3Wave2, room3Wave3);

            roomThreeBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 4) {
          //spawn first wave
          room4Wave1.spawn();

          //spawn wave 2
          if(room4Wave1.enemiesAlive <= 0) {
            room4Wave2.spawn();
          }

          //spawn wave 3
          if(room4Wave2.enemiesAlive <= 0) {
            room4Wave3.spawn();
          }

          //spawn room barriers
          if(!roomFourBarriersCreated) {

            //barriers on the left side of room 4
            new RoomBarrier(game, 19, 18, player, room4Wave1, room4Wave2, room4Wave3);
            new RoomBarrier(game, 19, 19, player, room4Wave1, room4Wave2, room4Wave3);
            new RoomBarrier(game, 19, 20, player, room4Wave1, room4Wave2, room4Wave3);

            //barriers on the top of room 4
            new RoomBarrier(game, 32, 11, player, room4Wave1, room4Wave2, room4Wave3);
            new RoomBarrier(game, 33, 11, player, room4Wave1, room4Wave2, room4Wave3);

            //barriers on the bottom of room 4
            new RoomBarrier(game, 33, 24, player, room4Wave1, room4Wave2, room4Wave3);
            new RoomBarrier(game, 34, 24, player, room4Wave1, room4Wave2, room4Wave3);


            roomFourBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 5) {
          //spawn first wave
          room5Wave1.spawn();

          //track room 5 spawners with the escape point
          escape.trackSpawner(room5Wave1);
          escape.trackSpawner(room5Wave2);

          //spawn second wave
          if(room5Wave1.enemiesAlive <= 0) {
            room5Wave2.spawn();
          }

          //spawn room barriers
          if(!roomFiveBarriersCreated) {
            new RoomBarrier(game, 20, 31, player, room5Wave1, room5Wave2);
            new RoomBarrier(game, 20, 32, player, room5Wave1, room5Wave2);
            new RoomBarrier(game, 20, 33, player, room5Wave1, room5Wave2);

            roomFiveBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 6) {
          //spawn first wave
          room6Wave1.spawn();

          //spawn second wave
          if(room6Wave1.enemiesAlive <= 0) {
            room6Wave2.spawn();
          }

          //spawn third wave
          if(room6Wave2.enemiesAlive <= 0) {
            room6Wave3.spawn();
          }

          if(!roomSixBarriersCreated) {
            //barriers on the left side of room 6
            new RoomBarrier(game, 19, 31, player, room6Wave1, room6Wave2, room6Wave3);
            new RoomBarrier(game, 19, 32, player, room6Wave1, room6Wave2, room6Wave3);
            new RoomBarrier(game, 19, 33, player, room6Wave1, room6Wave2, room6Wave3);

            //barriers on the top of room 6
            new RoomBarrier(game, 33, 23, player, room6Wave1, room6Wave2, room6Wave3);
            new RoomBarrier(game, 34, 23, player, room6Wave1, room6Wave2, room6Wave3);

            //barriers on the bottom of room 6
            new RoomBarrier(game, 30, 36, player, room6Wave1, room6Wave2, room6Wave3);
            new RoomBarrier(game, 31, 36, player, room6Wave1, room6Wave2, room6Wave3);
            new RoomBarrier(game, 32, 36, player, room6Wave1, room6Wave2, room6Wave3);

            roomSixBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 7) {
          //spawn first wave
          room7Wave1.spawn();

          //make the escape point track the spawners in room 7
          escape.trackSpawner(room7Wave1);
          escape.trackSpawner(room7Wave2);
          escape.trackSpawner(room7Wave3);

          //spawn second wave
          if(room7Wave1.enemiesAlive <= 0) {
            room7Wave2.spawn();
          }

          //spawn third wave
          if(room7Wave2.enemiesAlive <= 0) {
            room7Wave3.spawn();
          }

          //spawn room barriers
          if(!roomSevenBarriersCreated) {
            new RoomBarrier(game, 20, 43, player, room7Wave1, room7Wave2, room7Wave3);
            new RoomBarrier(game, 20, 44, player, room7Wave1, room7Wave2, room7Wave3);
            new RoomBarrier(game, 20, 45, player, room7Wave1, room7Wave2, room7Wave3);

            roomSevenBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 8) {
          //spawn first wave
          room8RangedWave1.spawn();
          room8Wave1.spawn();

          //spawn second wave
          if(room8RangedWave1.enemiesAlive <= 0 && room8Wave1.enemiesAlive <= 0) {
            room8RangedWave2.spawn();
            room8Wave2.spawn();
          }

          //spawn in room barriers
          if(!roomEightBarriersCreated) {
            //barriers on the left side of room 8
            new RoomBarrier(game, 19, 43, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2);
            new RoomBarrier(game, 19, 44, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2);
            new RoomBarrier(game, 19, 45, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2);

            //barriers on the top of room 8
            new RoomBarrier(game, 30, 35, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2);
            new RoomBarrier(game, 31, 35, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2);
            new RoomBarrier(game, 32, 35, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2);

            roomEightBarriersCreated = true;
          }
        }
    }
};
