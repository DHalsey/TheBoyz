//Level4.js

var Level4 = function(game) {
  var room1Wave1, room1Wave1Ranged, room1Wave2, room1Wave2Ranged, room1Wave3;
  var room2Wave1, room2Wave2, room2Wave3, room2Points;
  var room3Wave1, room3Wave2, room3Wave3;
  var room4Wave1, room4Wave1Ranged, room4Wave2, room4Wave2Ranged;
  var room5Wave1, room5Wave1Ranged, room5Wave2, room5Points;
  var room6Wave1, room6Wave1Ranged, room6Wave2, room6Wave2Ranged, room6Wave3, room6Wave3Ranged;
  var room7Wave1, room7Wave2, room7Wave3, room7Points;
  var room8Wave1, room8Wave2, room8Wave3, room8Points;
  var room9Wave1, room9Wave1Ranged, room9Wave2, room9Wave2Ranged, room9Wave3;
  var escape, healthBar;
  var roomOneBarriersCreated, roomTwoBarriersCreated, roomThreeBarriersCreated, roomFourBarriersCreated;
  var roomFiveBarriersCreated, roomSixBarriersCreated, roomSevenBarriersCreated, roomEightBarriersCreated, roomNineBarriersCreated;
  var barrierDelay;
};
Level4.prototype = {
    preload: function(){
	},
	create: function(){
        world_width = 3840; //The world has been set to be 3x3 rooms big
        world_height= 2304;
        room_width = 1280;
        room_height= 768;

        playMusic.loopFull();

        //start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set world size and adjust color to white
        game.stage.setBackgroundColor('#ffffff');
        game.world.setBounds(0,0,world_width,world_height);

		levelSelect(4);

        //create groups
        bloodParticles = game.add.physicsGroup();
        weaponGroup = game.add.group();
        enemyGroup = game.add.physicsGroup();
        playerBullets = game.add.physicsGroup();
        enemyBullets = game.add.physicsGroup();
        enemyMissiles = game.add.physicsGroup();
        missileParticles = game.add.physicsGroup();
        
        barriers = game.add.group();

        player = new Player(game, (11*64)+32, (5*64)+32, 200, 'atlas', 'player0001', 15);
        //update the player's stats
        updateStats(player, statChanger);

       createHealthBar();

       level4RoomAnchors();

       //spawn in the escape point
       escape = new EscapePoint(game, [new SpawnPoint(26,21), new SpawnPoint(44,31), new SpawnPoint(42,21), new SpawnPoint(57,2)], player);

       //Room 1 spawners
       room1Wave1Ranged = new EnemySpawner(['MissileLauncher', 'MissileLauncher'], [new SpawnPoint(1,1), new SpawnPoint(18,10)], player);
       room1Wave1 = new EnemySpawner(['BasicCharger', 'TankyCharger', 'FastCharger'], [new SpawnPoint(1,6), new SpawnPoint(5,2), new SpawnPoint(7,8), new SpawnPoint(14,9), new SpawnPoint(17,4)], player);
       room1Wave2Ranged = new EnemySpawner(['Missilelauncher', 'MissileLauncher'], [new SpawnPoint(1,8), new SpawnPoint(2,9), new SpawnPoint(3,10)], player);
       room1Wave2 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'TankyCharger', 'TankyCharger'], [new SpawnPoint(14,1), new SpawnPoint(15,2), new SpawnPoint(16,3), new SpawnPoint(17,4), new SpawnPoint(18,5)], player);
       room1Wave3 = new EnemySpawner(['BasicShooter', 'FastCharger', 'BasicCharger', 'BasicCharger'], [new SpawnPoint(4,3), new SpawnPoint(5,5), new SpawnPoint(7,2), new SpawnPoint(8,7), new SpawnPoint(10,2), new SpawnPoint(11,9), new SpawnPoint(13,3), new SpawnPoint(16,3), new SpawnPoint(16,9)], player);

       //Room 2 spawners
       room2Points = new Array(new SpawnPoint(23,2), new SpawnPoint(23,4), new SpawnPoint(22,7), new SpawnPoint(24,9),
                              new SpawnPoint(28,9), new SpawnPoint(29,2), new SpawnPoint(33,2), new SpawnPoint(33,8),
                              new SpawnPoint(35,3), new SpawnPoint(36,6), new SpawnPoint(37,4), new SpawnPoint(37,9));
       room2Wave1 = new EnemySpawner(['BasicShooter', 'BasicShooter', 'FastCharger', 'TankyCharger'], room2Points, player);
       room2Wave2 = new EnemySpawner(['MissileLauncher', 'BasicCharger', 'FastCharger', 'FastCharger'], room2Points, player);
       room2Wave3 = new EnemySpawner(['MissileLauncher', 'MissileLauncher', 'MissileLauncher', 'MissileLauncher'], room2Points, player);

       //Room 3 spawners
       room3Wave1 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'BasicCharger', 'BasicCharger', 'BasicCharger'], [new SpawnPoint(43,8), new SpawnPoint(44,7), new SpawnPoint(45,6), new SpawnPoint(46,5), new SpawnPoint(47,4)], player);
       room3Wave2 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'TankyCharger', 'TankyCharger', 'BasicCharger'], [new SpawnPoint(54,9), new SpawnPoint(55,8), new SpawnPoint(56,7), new SpawnPoint(57,6), new SpawnPoint(58,5)], player);
       room3Wave3 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'FastCharger', 'FastCharger', 'FastCharger'], [new SpawnPoint(44,6), new SpawnPoint(45,7), new SpawnPoint(46,8), new SpawnPoint(47,9), new SpawnPoint(48,10)], player);

       //Room 4 spawners
       room4Wave1Ranged = new EnemySpawner(['MissileLauncher', 'MissileLauncher', 'BasicShooter', 'BasicShooter'], [new SpawnPoint(3,12), new SpawnPoint(1,14), new SpawnPoint(18,20), new SpawnPoint(16,22)], player);
       room4Wave1 = new EnemySpawner(['BasicCharger', 'TankyCharger'], [new SpawnPoint(3,18), new SpawnPoint(8,21), new SpawnPoint(13,14), new SpawnPoint(17,16)], player);
       room4Wave2Ranged = new EnemySpawner(['MissileLauncher', 'MissileLauncher', 'MissileLauncher', 'BasicShooter'], [new SpawnPoint(3,12), new SpawnPoint(1,14), new SpawnPoint(18,20), new SpawnPoint(16,22)], player);
       room4Wave2 = new EnemySpawner(['FastCharger', 'TankyCharger'], [new SpawnPoint(3,18), new SpawnPoint(8,21), new SpawnPoint(13,14), new SpawnPoint(17,16)], player);

       //Room 5 spawners
       room5Points = new Array(new SpawnPoint(26,16), new SpawnPoint(26,21), new SpawnPoint(27,19), new SpawnPoint(31,15),
                              new SpawnPoint(32,21), new SpawnPoint(36,20), new SpawnPoint(37,16));
       room5Wave1Ranged = new EnemySpawner(['MissileLauncher', 'MissileLauncher', 'MissileLauncher'], [new SpawnPoint(21,20), new SpawnPoint(22,21), new SpawnPoint(23,22)], player);
       room5Wave1 = new EnemySpawner(['TankyCharger', 'TankyCharger'], room5Points, player);
       room5Wave2 = new EnemySpawner(['MissileLauncher', 'BasicShooter', 'BasicCharger', 'FastCharger', 'TankyCharger'], room5Points, player);

       //Room 6 spawners
       room6Wave1Ranged = new EnemySpawner(['BasicShooter', 'BasicShooter'], [new SpawnPoint(56,13), new SpawnPoint(57,14), new SpawnPoint(58,15)], player);
       room6Wave1 = new EnemySpawner(['BasicCharger', 'TankyCharger', 'TankyCharger'], [new SpawnPoint(42,14), new SpawnPoint(43,18), new SpawnPoint(43,21), new SpawnPoint(48,20), new SpawnPoint(51,14), new SpawnPoint(54,21), new SpawnPoint(55,16)], player);
       room6Wave2Ranged = new EnemySpawner(['MissileLauncher', 'MissileLauncher'], [new SpawnPoint(56,13), new SpawnPoint(57,14), new SpawnPoint(58,15)], player);
       room6Wave2 = new EnemySpawner(['FastCharger', 'TankyCharger', 'TankyCharger'], [new SpawnPoint(42,14), new SpawnPoint(43,18), new SpawnPoint(43,21), new SpawnPoint(48,20), new SpawnPoint(51,14), new SpawnPoint(54,21), new SpawnPoint(55,16)], player);
       room6Wave3Ranged = new EnemySpawner(['BasicShooter', 'MissileLauncher', 'MissileLauncher'], [new SpawnPoint(56,13), new SpawnPoint(57,14), new SpawnPoint(58,15)], player);
       room6Wave3 = new EnemySpawner(['BasicCharger', 'TankyCharger', 'TankyCharger', 'FastCharger'], [new SpawnPoint(42,14), new SpawnPoint(43,18), new SpawnPoint(43,21), new SpawnPoint(48,20), new SpawnPoint(51,14), new SpawnPoint(54,21), new SpawnPoint(55,16)], player);

       //Room 7 Spawners
       room7Points = new Array(new SpawnPoint(3,27), new SpawnPoint(3,32), new SpawnPoint(6,28), new SpawnPoint(7,26),
                              new SpawnPoint(7,33), new SpawnPoint(10,33), new SpawnPoint(12,26), new SpawnPoint(12,32),
                              new SpawnPoint(15,32), new SpawnPoint(16,26), new SpawnPoint(16,29), new SpawnPoint(17,33));
       room7Wave1 = new EnemySpawner(['BasicShooter', 'MissileLauncher', 'BasicCharger', 'FastCharger', 'TankyCharger'], room7Points, player);
       room7Wave2 = new EnemySpawner(['MissileLauncher', 'MissileLauncher', 'FastCharger', 'FastCharger', 'TankyCharger'], room7Points, player);
       room7Wave3 = new EnemySpawner(['BasicShooter', 'BasicShooter', 'TankyCharger', 'FastCharger', 'TankyCharger'], room7Points, player);

       //Room 8 spawners
       room8Points = new Array(new SpawnPoint(22,26), new SpawnPoint(22,33), new SpawnPoint(23,29), new SpawnPoint(25,32),
                              new SpawnPoint(26,25), new SpawnPoint(28,33), new SpawnPoint(30,26), new SpawnPoint(33,33),
                              new SpawnPoint(34,27), new SpawnPoint(36,31), new SpawnPoint(37,33), new SpawnPoint(38,28));
       room8Wave1 = new EnemySpawner(['BasicShooter', 'BasicShooter', 'FastCharger', 'FastCharger', 'TankyCharger'], room8Points, player);
       room8Wave2 = new EnemySpawner(['BasicShooter', 'MissileLauncher', 'FastCharger', 'TankyCharger', 'TankyCharger'], room8Points, player);
       room8Wave3 = new EnemySpawner(['BasicShooter', 'BasicShooter', 'MissileLauncher', 'FastCharger', 'TankyCharger'], room8Points, player);

       //Room 9 spawners
       room9Wave1Ranged = new EnemySpawner(['MissileLauncher', 'MissileLauncher'], [new SpawnPoint(44,25), new SpawnPoint(46,26), new SpawnPoint(49,26), new SpawnPoint(53,25)], player);
       room9Wave1 = new EnemySpawner(['BasicCharger', 'FastCharger', 'FastCharger'], [new SpawnPoint(50,33), new SpawnPoint(52,33), new SpawnPoint(54,33), new SpawnPoint(55,31)], player);
       room9Wave2Ranged = new EnemySpawner(['MissileLauncher', 'BasicShooter', 'MissileLauncher'], [new SpawnPoint(44,25), new SpawnPoint(46,26), new SpawnPoint(49,26), new SpawnPoint(53,25)], player);
       room9Wave2 = new EnemySpawner(['BasicCharger', 'FastCharger', 'FastCharger'], [new SpawnPoint(41,27), new SpawnPoint(42,33), new SpawnPoint(43,29), new SpawnPoint(45,31), new SpawnPoint(48,33)], player);
       room9Wave3 = new EnemySpawner(['BasicCharger', 'MissileLauncher', 'FastCharger', 'TankyCharger', 'BasicCharger'], [new SpawnPoint(41,27), new SpawnPoint(42,33), new SpawnPoint(43,29), new SpawnPoint(45,31), new SpawnPoint(48,33), new SpawnPoint(51,32), new SpawnPoint(54,33), new SpawnPoint(55,30), new SpawnPoint(57,33), new SpawnPoint(57,27)], player);

       roomOneBarriersCreated = false;
       roomTwoBarriersCreated = false;
       roomThreeBarriersCreated = false;
       roomFourBarriersCreated = false;
       roomFiveBarriersCreated = false;
       roomSixBarriersCreated = false;
       roomSevenBarriersCreated = false;
       roomEightBarriersCreated = false;
       roomNineBarriersCreated = false;


       // Ammo indicator
      ammoText = createAmmoText(player);

      reticle = game.add.sprite(game.input.activePointer.x - 8, game.input.activePointer.y - 8, 'reticle');
      reticle.anchor.setTo(0.5);

      createInGameScore();

	},

	update: function(){

        updateInGameScore();

        game.physics.arcade.collide(player, layerCollision);

        game.physics.arcade.collide(enemyGroup, layerCollision);

        level4RoomTransition(player, room_width, room_height);
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
          room1Wave1Ranged.spawn();

          //spawn second wave
          if(room1Wave1.enemiesAlive <= 0 && room1Wave1Ranged.enemiesAlive <= 0) {
            room1Wave2.spawn();
            room1Wave2Ranged.spawn();
          }

          //spawn third wave
          if(room1Wave2.enemiesAlive <= 0 && room1Wave2Ranged.enemiesAlive <= 0) {
            room1Wave3.spawn();
          }

          //spawn room barriers
          if(!roomOneBarriersCreated) {
            //right side
            new RoomBarrier(game, 20, 3, player, room1Wave1, room1Wave1Ranged, room1Wave2, room1Wave2Ranged, room1Wave3);
            new RoomBarrier(game, 20, 4, player, room1Wave1, room1Wave1Ranged, room1Wave2, room1Wave2Ranged, room1Wave3);

            //bottom side
            new RoomBarrier(game, 9,12, player, room1Wave1, room1Wave1Ranged, room1Wave2, room1Wave2Ranged, room1Wave3);
            new RoomBarrier(game, 10,12, player, room1Wave1, room1Wave1Ranged, room1Wave2, room1Wave2Ranged, room1Wave3);
            new RoomBarrier(game, 11,12, player, room1Wave1, room1Wave1Ranged, room1Wave2, room1Wave2Ranged, room1Wave3);

            roomOneBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 2) {
          //spawn first wave
          room2Wave1.spawn()

          //spawn second wave
          if(room2Wave1.enemiesAlive <= 0) {
            room2Wave2.spawn();
          }

          //spawn third wave
          if(room2Wave2.enemiesAlive <= 0) {
            room2Wave3.spawn();
          }

          //spawn in room 2 barriers
          if(!roomTwoBarriersCreated) {
            new RoomBarrier(game, 30, 12, player, room2Wave1, room2Wave2, room2Wave3);
            new RoomBarrier(game, 31, 12, player, room2Wave1, room2Wave2, room2Wave3);

            new RoomBarrier(game, 19, 3, player, room2Wave1, room2Wave2, room2Wave3);
            new RoomBarrier(game, 19, 4, player, room2Wave1, room2Wave2, room2Wave3);

            roomTwoBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 3) {
          room3Wave1.spawn();

          escape.trackSpawner(room3Wave1);
          escape.trackSpawner(room3Wave2);
          escape.trackSpawner(room3Wave3);

          if(room3Wave1.enemiesAlive <= 0) {
            room3Wave2.spawn();
          }

          if(room3Wave2.enemiesAlive <= 0) {
            room3Wave3.spawn();
          }

          if(!roomThreeBarriersCreated) {;

            //barriers on bottom side of room 3
            new RoomBarrier(game, 53, 12, player, room3Wave1, room3Wave2, room3Wave3);
            new RoomBarrier(game, 54, 12, player, room3Wave1, room3Wave2, room3Wave3);

            roomThreeBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 4) {
          //spawn first wave
          room4Wave1.spawn();
          room4Wave1Ranged.spawn();

          //spawn wave 2
          if(room4Wave1.enemiesAlive <= 0 && room4Wave1Ranged.enemiesAlive <= 0) {
            room4Wave2.spawn();
            room4Wave2Ranged.spawn();
          }

          //spawn room barriers
          if(!roomFourBarriersCreated) {

            //barriers on the top side of room 4
           new RoomBarrier(game, 9, 11, player, room4Wave1, room4Wave1Ranged, room4Wave2, room4Wave2Ranged);
           new RoomBarrier(game, 10, 11, player, room4Wave1, room4Wave1Ranged, room4Wave2, room4Wave2Ranged);
           new RoomBarrier(game, 11, 11, player, room4Wave1, room4Wave1Ranged, room4Wave2, room4Wave2Ranged);

           //barriers on the bottom side of room 4
           new RoomBarrier(game, 8, 24, player, room4Wave1, room4Wave1Ranged, room4Wave2, room4Wave2Ranged);
           new RoomBarrier(game, 9, 24, player, room4Wave1, room4Wave1Ranged, room4Wave2, room4Wave2Ranged);
           new RoomBarrier(game, 10, 24, player, room4Wave1, room4Wave1Ranged, room4Wave2, room4Wave2Ranged);
           new RoomBarrier(game, 11, 24, player, room4Wave1, room4Wave1Ranged, room4Wave2, room4Wave2Ranged);
            roomFourBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 5) {
          //spawn first wave
          room5Wave1.spawn();
          room5Wave1Ranged.spawn();

          //track spawners
          escape.trackSpawner(room5Wave1);
          escape.trackSpawner(room5Wave1Ranged);
          escape.trackSpawner(room5Wave2);

          //spawn second wave
          if(room5Wave1.enemiesAlive <= 0 && room5Wave1Ranged.enemiesAlive <= 0) {
            room5Wave2.spawn();
          }

          //spawn room barriers
          if(!roomFiveBarriersCreated) {
            new RoomBarrier(game, 30,11, player, room5Wave1, room5Wave1Ranged, room5Wave2);
            new RoomBarrier(game, 31,11, player, room5Wave1, room5Wave1Ranged, room5Wave2);

            new RoomBarrier(game, 40,15, player, room5Wave1, room5Wave1Ranged, room5Wave2);
            new RoomBarrier(game, 40,16, player, room5Wave1, room5Wave1Ranged, room5Wave2);
            new RoomBarrier(game, 40,17, player, room5Wave1, room5Wave1Ranged, room5Wave2);

            roomFiveBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 6) {
          //spawn first wave
          room6Wave1.spawn();
          room6Wave1Ranged.spawn();

          escape.trackSpawner(room6Wave1);
          escape.trackSpawner(room6Wave1Ranged);
          escape.trackSpawner(room6Wave2);
          escape.trackSpawner(room6Wave2Ranged);
          escape.trackSpawner(room6Wave3);
          escape.trackSpawner(room6Wave3Ranged);

          //spawn second wave
          if(room6Wave1.enemiesAlive <= 0 && room6Wave1Ranged.enemiesAlive <= 0) {
            room6Wave2.spawn();
            room6Wave2Ranged.spawn();
          }

          //spawn third wave
          if(room6Wave2.enemiesAlive <= 0 && room6Wave2Ranged.enemiesAlive <= 0) {
            room6Wave3.spawn();
            room6Wave3Ranged.spawn();
          }

          if(!roomSixBarriersCreated) {
            //barriers on the top side of room 6
            new RoomBarrier(game, 53, 11, player, room6Wave1, room6Wave1Ranged, room6Wave2, room6Wave2Ranged, room6Wave3, room6Wave3Ranged);
            new RoomBarrier(game, 54, 11, player, room6Wave1, room6Wave1Ranged, room6Wave2, room6Wave2Ranged, room6Wave3, room6Wave3Ranged);

            //barriers on the bottom of room 6
            new RoomBarrier(game, 56, 24, player, room6Wave1, room6Wave1Ranged, room6Wave2, room6Wave2Ranged, room6Wave3, room6Wave3Ranged);
            new RoomBarrier(game, 57, 24, player, room6Wave1, room6Wave1Ranged, room6Wave2, room6Wave2Ranged, room6Wave3, room6Wave3Ranged);
            new RoomBarrier(game, 58, 24, player, room6Wave1, room6Wave1Ranged, room6Wave2, room6Wave2Ranged, room6Wave3, room6Wave3Ranged);

            //barriers on the left of room 6
            new RoomBarrier(game, 39, 15, player, room6Wave1, room6Wave1Ranged, room6Wave2, room6Wave2Ranged, room6Wave3, room6Wave3Ranged);
            new RoomBarrier(game, 39, 16, player, room6Wave1, room6Wave1Ranged, room6Wave2, room6Wave2Ranged, room6Wave3, room6Wave3Ranged);
            new RoomBarrier(game, 39, 17, player, room6Wave1, room6Wave1Ranged, room6Wave2, room6Wave2Ranged, room6Wave3, room6Wave3Ranged);

            roomSixBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 7) {
          //spawn first wave
          room7Wave1.spawn();

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
            //barriers on top
            new RoomBarrier(game, 8, 23, player, room7Wave1, room7Wave2, room7Wave3);
            new RoomBarrier(game, 9, 23, player, room7Wave1, room7Wave2, room7Wave3);
            new RoomBarrier(game, 10, 23, player, room7Wave1, room7Wave2, room7Wave3);
            new RoomBarrier(game, 11, 23, player, room7Wave1, room7Wave2, room7Wave3);

            //barriers on left
            new RoomBarrier(game, 20, 32, player, room7Wave1, room7Wave2, room7Wave3);
            new RoomBarrier(game, 20, 33, player, room7Wave1, room7Wave2, room7Wave3);
            new RoomBarrier(game, 20, 34, player, room7Wave1, room7Wave2, room7Wave3);

            roomSevenBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 8) {
          //spawn first wave
          room8Wave1.spawn();

          //spawn second wave
          if(room8Wave1.enemiesAlive <= 0) {
            room8Wave2.spawn();
          }

          //spawn third wave
          if(room8Wave2.enemiesAlive <= 0) {
            room8Wave3.spawn();
          }

          //spawn in room barriers
          if(!roomEightBarriersCreated) {
            //barriers on the left
            new RoomBarrier(game, 19, 32, player, room8Wave1, room8Wave2, room8Wave3);
            new RoomBarrier(game, 19, 33, player, room8Wave1, room8Wave2, room8Wave3);
            new RoomBarrier(game, 19, 34, player, room8Wave1, room8Wave2, room8Wave3);

            //barriers on the right
            new RoomBarrier(game, 40, 27, player, room8Wave1, room8Wave2, room8Wave3);
            new RoomBarrier(game, 40, 28, player, room8Wave1, room8Wave2, room8Wave3);
            new RoomBarrier(game, 40, 29, player, room8Wave1, room8Wave2, room8Wave3);
            new RoomBarrier(game, 40, 30, player, room8Wave1, room8Wave2, room8Wave3);
            new RoomBarrier(game, 40, 31, player, room8Wave1, room8Wave2, room8Wave3);

            roomEightBarriersCreated = true;
          }
        }
        else if(player.currentRoom == 9) {
          //spawn first wave
          room9Wave1.spawn();
          room9Wave1Ranged.spawn();

          //track spawners
          escape.trackSpawner(room9Wave1);
          escape.trackSpawner(room9Wave1Ranged);
          escape.trackSpawner(room9Wave2);
          escape.trackSpawner(room9Wave2Ranged);
          escape.trackSpawner(room9Wave3);

          //spawn second wave
          if(room9Wave1.enemiesAlive <= 0 && room9Wave1Ranged.enemiesAlive <= 0) {
            room9Wave2.spawn();
            room9Wave2Ranged.spawn();
          }

          //spawn third wave
          if(room9Wave2.enemiesAlive <= 0 && room9Wave2Ranged.enemiesAlive <= 0) {
            room9Wave3.spawn();
          }

          //spawn in room barriers
          if(!roomNineBarriersCreated) {
            //barriers on the left
            new RoomBarrier(game, 39, 27, player, room9Wave1, room9Wave1Ranged, room9Wave2, room9Wave2Ranged, room9Wave3);
            new RoomBarrier(game, 39, 28, player, room9Wave1, room9Wave1Ranged, room9Wave2, room9Wave2Ranged, room9Wave3);
            new RoomBarrier(game, 39, 29, player, room9Wave1, room9Wave1Ranged, room9Wave2, room9Wave2Ranged, room9Wave3);
            new RoomBarrier(game, 39, 30, player, room9Wave1, room9Wave1Ranged, room9Wave2, room9Wave2Ranged, room9Wave3);
            new RoomBarrier(game, 39, 31, player, room9Wave1, room9Wave1Ranged, room9Wave2, room9Wave2Ranged, room9Wave3);

            //barriers on the top
            new RoomBarrier(game, 56, 23, player, room9Wave1, room9Wave1Ranged, room9Wave2, room9Wave2Ranged, room9Wave3);
            new RoomBarrier(game, 57, 23, player, room9Wave1, room9Wave1Ranged, room9Wave2, room9Wave2Ranged, room9Wave3);
            new RoomBarrier(game, 58, 23, player, room9Wave1, room9Wave1Ranged, room9Wave2, room9Wave2Ranged, room9Wave3);

            roomNineBarriersCreated = true;
          }
        }
    }
};