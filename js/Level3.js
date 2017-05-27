//Level3.js

var Level3 = function(game) {
    var room1Wave1, room1Wave2, room1RangedWave1, room1RangedWave2;
    var room2Wave1, room2RangedWave1;
    var room3Wave1, room3Wave2, room3Wave3, room3RangedWave1, room3RangedWave2, room3RangedWave3;
    var room4Wave1, room4Wave2, room4RangedWave1, room4RangedWave2;
    var room5Wave1, room5Wave2, room5RangedWave1, room5RangedWave2;
    var room6Wave1, room6Wave2, room6Wave3, room6RangedWave1, room6RangedWave3;
    var room7Wave1, room7Wave2, room7RangedWave1, room7RangedWave2;
    var room8Wave1, room8Wave2, room8Wave3, room8RangedWave1, room8RangedWave2, room8RangedWave3;
    var escape, healthBar;
    var roomOneBarriersCreated, roomTwoBarriersCreated, roomThreeBarriersCreated, roomFourBarriersCreated;
    var roomFiveBarriersCreated, roomSixBarriersCreated, roomSevenBarriersCreated, roomEightBarriersCreated;
    var barrierDelay;
};
Level3.prototype = {
    preload: function(){
	},
	create: function(){
        world_width = 2560; //The world has been set to be 2x4 rooms big
        world_height= 3072;
        room_width = 1280;
        room_height= 768;

        //start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set world size and adjust color to white
        game.stage.setBackgroundColor('#ffffff');
        game.world.setBounds(0,0,world_width,world_height);

		levelSelect(3);

        //create groups
        playerBullets = game.add.physicsGroup();
        enemyBullets = game.add.physicsGroup();
        enemyGroup = game.add.physicsGroup();
        enemyMissiles = game.add.physicsGroup();
        missileParticles = game.add.physicsGroup();
        barriers = game.add.group();
        weaponGroup = game.add.group();

        player = new Player(game, (7*64)+32, (5*64)+32, 'atlas', 'player0001', 10);
        //update the player's stats
        updateStats(player, statChanger);

        //room 1 spawners
        room1RangedWave1 = new EnemySpawner(['BasicShooter'], [new SpawnPoint(16,8)],player);
        room1Wave1 = new EnemySpawner(['BasicCharger', 'FastCharger'], [new SpawnPoint(3,8), new SpawnPoint(15,3)], player);
        room1RangedWave2 = new EnemySpawner(['MissileLauncher'], [new SpawnPoint(16,9)],player);
        room1Wave2 = new EnemySpawner(['FastCharger', 'BasicCharger', 'FastCharger', 'TankyCharger'], [new SpawnPoint(3,5), new SpawnPoint(15,2), new SpawnPoint(15,4), new SpawnPoint(3,8)], player);

        //room 2 spawners
        room2RangedWave1 = new EnemySpawner(['MissileLauncher', 'MissileLauncher'], [new SpawnPoint(21,8), new SpawnPoint(21,9), new SpawnPoint(22,3)], player);
        room2Wave1 = new EnemySpawner(['FastCharger', 'FastCharger', 'TankyCharger', 'TankyCharger', 'BasicCharger', 'BasicCharger'], [new SpawnPoint(26,6), new SpawnPoint(26,7), new SpawnPoint(24,3), new SpawnPoint(25,9), new SpawnPoint(27,3), new SpawnPoint(36,6), new SpawnPoint(29,3), new SpawnPoint(32,3)], player);

        //room 3 spawners
        room3RangedWave1 = new EnemySpawner(['BasicShooter', 'BasicShooter'], [new SpawnPoint(15,21), new SpawnPoint(2,21), new SpawnPoint(2,15)], player);
        room3Wave1 = new EnemySpawner(['FastCharger', 'BasicCharger', 'BasicCharger'], [new SpawnPoint(6,22), new SpawnPoint(14,16), new SpawnPoint(2,17)], player);
        room3RangedWave2 = new EnemySpawner(['MissileLauncher', 'MissileLauncher'], [new SpawnPoint(15,13), new SpawnPoint(15,21)], player);
        room3Wave2 = new EnemySpawner(['TankyCharger', 'TankyCharger', 'BasicCharger'], [new SpawnPoint(5,21), new SpawnPoint(7,21), new SpawnPoint(6,13)], player);
        room3RangedWave3 = new EnemySpawner(['MissileLauncher', 'BasicShooter'], [new SpawnPoint(15,13), new SpawnPoint(2,15)], player);
        room3Wave3 = new EnemySpawner(['BasicCharger', 'TankyCharger', 'TankyCharger', 'FastCharger', 'FastCharger'], [new SpawnPoint(2,16), new SpawnPoint(12,14), new SpawnPoint(14,16), new SpawnPoint(2,21), new SpawnPoint(11,21)], player);

        //room 4 spawners
        room4RangedWave1 = new EnemySpawner(['BasicShooter', 'BasicShooter'], [new SpawnPoint(34,20), new SpawnPoint(33,14)], player);
        room4Wave1 = new EnemySpawner(['TankyCharger', 'BasicCharger'], [new SpawnPoint(24,21), new SpawnPoint(37,20)], player);
        room4RangedWave2 = new EnemySpawner(['MissileLauncher', 'MissileLauncher'], [new SpawnPoint(37,15), new SpawnPoint(35,22), new SpawnPoint(24,21)], player);
        room4Wave2 = new EnemySpawner(['TankyCharger', 'FastCharger', 'TankyCharger'], [new SpawnPoint(25,21), new SpawnPoint(29,14), new SpawnPoint(33,20), new SpawnPoint(37,17)], player);

        //room 5 spawners
        room5RangedWave1 = new EnemySpawner(['BasicShooter'], [new SpawnPoint(16,30), new SpawnPoint(16,34)], player);
        room5Wave1 = new EnemySpawner(['FastCharger', 'BasicCharger', 'TankyCharger'], [new SpawnPoint(14,30), new SpawnPoint(6,33), new SpawnPoint(2,27)], player);
        room5RangedWave2 = new EnemySpawner(['MissileLauncher'], [new SpawnPoint(2,33)], player);
        room5Wave2 = new EnemySpawner(['TankyCharger', 'TankyCharger', 'BasicCharger'], [new SpawnPoint(2,27), new SpawnPoint(15,33), new SpawnPoint(13,27)], player);

        //room 6 spawners
        room6RangedWave1 = new EnemySpawner(['BasicShooter', 'BasicShooter'], [new SpawnPoint(22,26), new SpawnPoint(22,34)], player);
        room6Wave1 = new EnemySpawner(['FastCharger', 'FastCharger', 'BasicCharger'], [new SpawnPoint(31, 26), new SpawnPoint(37,33), new SpawnPoint(35,29)], player);
        room6Wave2 = new EnemySpawner(['TankyCharger', 'TankyCharger', 'FastCharger', 'BasicCharger'], [new SpawnPoint(32,33), new SpawnPoint(31,33), new SpawnPoint(22,30), new SpawnPoint(23,26)], player);
        room6RangedWave3 = new EnemySpawner(['MissileLauncher'], [new SpawnPoint(22,26)], player);
        room6Wave3 = new EnemySpawner(['FastCharger', 'FastCharger', 'BasicCharger', 'BasicCharger'], [new SpawnPoint(35,26), new SpawnPoint(37,28), new SpawnPoint(23,30), new SpawnPoint(35,33)], player);

        //room 7 spawners
        room7RangedWave1 = new EnemySpawner(['BasicShooter'], [new SpawnPoint(1,46), new SpawnPoint(18,46)], player);
        room7Wave1 = new EnemySpawner(['FastCharger', 'BasicCharger'], [new SpawnPoint(16,37), new SpawnPoint(3,41)], player);
        room7RangedWave2 = new EnemySpawner(['MissileLauncher', 'MissileLauncher'], [new SpawnPoint(1,46), new SpawnPoint(18,46)], player);
        room7Wave2 = new EnemySpawner(['TankyCharger', 'TankyCharger'], [new SpawnPoint(16,44), new SpawnPoint(3,38)], player);

        //room 8 spawners
        room8RangedWave1 = new EnemySpawner(['BasicShooter'], [new SpawnPoint(38, 46), new SpawnPoint(21, 46)], player);
        room8Wave1 = new EnemySpawner(['BasicCharger', 'BasicCharger', 'FastCharger'], [new SpawnPoint(24,38), new SpawnPoint(36,40), new SpawnPoint(29,45)], player);
        room8RangedWave2 = new EnemySpawner(['MissileLauncher', 'BasicShooter', 'BasicShooter', 'BasicShooter'], [new SpawnPoint(29,41), new SpawnPoint(21, 42), new SpawnPoint(37, 38), new SpawnPoint(24,38)], player);
        room8Wave2 = new EnemySpawner(['TankyCharger'], [new SpawnPoint(21, 45)], player);
        room8RangedWave3 = new EnemySpawner(['MissileLauncher', 'MissileLauncher'], [new SpawnPoint(38, 45), new SpawnPoint(37, 46)], player);
        room8Wave3 = new EnemySpawner(['FastCharger', 'FastCharger', 'TankyCharger'], [new SpawnPoint(21, 41), new SpawnPoint(32, 37), new SpawnPoint(29, 45)], player);

        //spawn the escape point
        escape = new EscapePoint(game, [new SpawnPoint(38,41), new SpawnPoint(38,41), new SpawnPoint(36,26), new SpawnPoint(21,5), new SpawnPoint(21,5)], player);

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

       if(player.currentRoom == 1) {
           //spawn first wave
           room1RangedWave1.spawn();
           room1Wave1.spawn();

           //spawn second wave
           if(room1RangedWave1.enemiesAlive <= 0 && room1Wave1.enemiesAlive <= 0) {
               room1RangedWave2.spawn();
               room1Wave2.spawn();
           }

           //spawn room barriers
           if(!roomOneBarriersCreated) {
               new RoomBarrier(game, 5, 12, player, room1RangedWave1, room1Wave1, room1RangedWave2, room1Wave2);
               new RoomBarrier(game, 6, 12, player, room1RangedWave1, room1Wave1, room1RangedWave2, room1Wave2);
               new RoomBarrier(game, 7, 12, player, room1RangedWave1, room1Wave1, room1RangedWave2, room1Wave2);
               roomOneBarriersCreated = true;
           }
       }else if(player.currentRoom == 2) {
           //spawn first wave
           room2RangedWave1.spawn();
           room2Wave1.spawn();

           escape.trackSpawner(room2RangedWave1);
           escape.trackSpawner(room2Wave1);

           //spawn room barriers
           if(!roomTwoBarriersCreated) {
               new RoomBarrier(game, 36, 12, player, room2RangedWave1, room2Wave1);
               new RoomBarrier(game, 37, 12, player, room2RangedWave1, room2Wave1);
               new RoomBarrier(game, 38, 12, player, room2RangedWave1, room2Wave1);
               roomTwoBarriersCreated = true;
           }

       }else if(player.currentRoom == 3) {
           //spawn first wave
           room3RangedWave1.spawn();
           room3Wave1.spawn();

           //spawn second wave
           if(room3RangedWave1.enemiesAlive <= 0 && room3Wave1.enemiesAlive <= 0) {
               room3RangedWave2.spawn();
               room3Wave2.spawn();
           }

           //spawn third wave
           if(room3RangedWave2.enemiesAlive <= 0 && room3Wave2.enemiesAlive <= 0) {
               room3RangedWave3.spawn();
               room3Wave3.spawn();
           }

           //spawn room barriers
           if(!roomThreeBarriersCreated) {
               //barriers on top of the room
               new RoomBarrier(game, 5, 11, player, room3RangedWave1, room3Wave1, room3RangedWave2, room3Wave2, room3RangedWave3, room3Wave3);
               new RoomBarrier(game, 6, 11, player, room3RangedWave1, room3Wave1, room3RangedWave2, room3Wave2, room3RangedWave3, room3Wave3);
               new RoomBarrier(game, 7, 11, player, room3RangedWave1, room3Wave1, room3RangedWave2, room3Wave2, room3RangedWave3, room3Wave3);
               roomThreeBarriersCreated = true;

               //barriers on right side
               new RoomBarrier(game, 20, 15, player, room3RangedWave1, room3Wave1, room3RangedWave2, room3Wave2, room3RangedWave3, room3Wave3);
               new RoomBarrier(game, 20, 16, player, room3RangedWave1, room3Wave1, room3RangedWave2, room3Wave2, room3RangedWave3, room3Wave3);
               new RoomBarrier(game, 20, 17, player, room3RangedWave1, room3Wave1, room3RangedWave2, room3Wave2, room3RangedWave3, room3Wave3);

               //barriers on the bottom
               new RoomBarrier(game, 5, 24, player, room3RangedWave1, room3Wave1, room3RangedWave2, room3Wave2, room3RangedWave3, room3Wave3);
               new RoomBarrier(game, 6, 24, player, room3RangedWave1, room3Wave1, room3RangedWave2, room3Wave2, room3RangedWave3, room3Wave3);
               new RoomBarrier(game, 7, 24, player, room3RangedWave1, room3Wave1, room3RangedWave2, room3Wave2, room3RangedWave3, room3Wave3);
           }
       }else if(player.currentRoom == 4) {
           //spawn first wave
           room4RangedWave1.spawn();
           room4Wave1.spawn();

           //spawn second wave
           if(room4RangedWave1.enemiesAlive <= 0 && room4Wave1.enemiesAlive <= 0){
               room4RangedWave2.spawn();
               room4Wave2.spawn();
           }

           if(!roomFourBarriersCreated) {
               //barriers on the left
               new RoomBarrier(game, 19, 15, player, room4RangedWave1, room4Wave1, room4RangedWave2, room4Wave2);
               new RoomBarrier(game, 19, 16, player, room4RangedWave1, room4Wave1, room4RangedWave2, room4Wave2);
               new RoomBarrier(game, 19, 17, player, room4RangedWave1, room4Wave1, room4RangedWave2, room4Wave2);

               //barriers on top-right
               new RoomBarrier(game, 36, 11, player, room4RangedWave1, room4Wave1, room4RangedWave2, room4Wave2);
               new RoomBarrier(game, 37, 11, player, room4RangedWave1, room4Wave1, room4RangedWave2, room4Wave2);
               new RoomBarrier(game, 38, 11, player, room4RangedWave1, room4Wave1, room4RangedWave2, room4Wave2);

               roomFourBarriersCreated = true;
           }
       }else if(player.currentRoom == 5) {
           //spawn first wave
           room5RangedWave1.spawn();
           room5Wave1.spawn();

           //spawn second wave
           if(room5RangedWave1.enemiesAlive <= 0 && room5Wave1.enemiesAlive <= 0) {
               room5RangedWave2.spawn();
               room5Wave2.spawn();
           }

           //spawn room barriers
           if(!roomFiveBarriersCreated) {
               //barrier on top
               new RoomBarrier(game, 5, 23, player, room5RangedWave1, room5Wave1, room5RangedWave2, room5Wave2);
               new RoomBarrier(game, 6, 23, player, room5RangedWave1, room5Wave1, room5RangedWave2, room5Wave2);
               new RoomBarrier(game, 7, 23, player, room5RangedWave1, room5Wave1, room5RangedWave2, room5Wave2);
               //barrier on right
               new RoomBarrier(game, 20, 29, player, room5RangedWave1, room5Wave1, room5RangedWave2, room5Wave2);
               new RoomBarrier(game, 20, 30, player, room5RangedWave1, room5Wave1, room5RangedWave2, room5Wave2);
               new RoomBarrier(game, 20, 31, player, room5RangedWave1, room5Wave1, room5RangedWave2, room5Wave2);
               //barrier on bottom
               new RoomBarrier(game, 8, 36, player, room5RangedWave1, room5Wave1, room5RangedWave2, room5Wave2);
               new RoomBarrier(game, 9, 36, player, room5RangedWave1, room5Wave1, room5RangedWave2, room5Wave2);
               new RoomBarrier(game, 10, 36, player, room5RangedWave1, room5Wave1, room5RangedWave2, room5Wave2);

               roomFiveBarriersCreated = true;
           }
       }else if(player.currentRoom == 6) {
           //spawn first wave
           room6RangedWave1.spawn();
           room6Wave1.spawn();

           escape.trackSpawner(room6RangedWave1);
           escape.trackSpawner(room6Wave1);
           escape.trackSpawner(room6Wave2);
           escape.trackSpawner(room6RangedWave3);
           escape.trackSpawner(room6Wave3);

           //spawn second wave
           if(room6RangedWave1.enemiesAlive <= 0 && room6Wave1.enemiesAlive <= 0) {
               room6Wave2.spawn();
           }

           //spawn third wave
           if(room6Wave2.enemiesAlive <= 0) {
               room6RangedWave3.spawn();
               room6Wave3.spawn();
           }

           if(!roomSixBarriersCreated) {
               //barriers on the left
               new RoomBarrier(game, 19, 29, player, room6RangedWave1, room6Wave1, room6Wave2, room6RangedWave3, room6Wave3);
               new RoomBarrier(game, 19, 30, player, room6RangedWave1, room6Wave1, room6Wave2, room6RangedWave3, room6Wave3);
               new RoomBarrier(game, 19, 31, player, room6RangedWave1, room6Wave1, room6Wave2, room6RangedWave3, room6Wave3);

               new RoomBarrier(game, 30, 36, player, room6RangedWave1, room6Wave1, room6Wave2, room6RangedWave3, room6Wave3);
               new RoomBarrier(game, 31, 36, player, room6RangedWave1, room6Wave1, room6Wave2, room6RangedWave3, room6Wave3);
               new RoomBarrier(game, 32, 36, player, room6RangedWave1, room6Wave1, room6Wave2, room6RangedWave3, room6Wave3);
               new RoomBarrier(game, 33, 36, player, room6RangedWave1, room6Wave1, room6Wave2, room6RangedWave3, room6Wave3);

               roomSixBarriersCreated = true;
           }
       }else if(player.currentRoom == 7) {
           //spawn first wave
           room7RangedWave1.spawn();
           room7Wave1.spawn();

           //spawn second room
           if(room7RangedWave1.enemiesAlive <= 0 && room7Wave1.enemiesAlive <= 0) {
               room7RangedWave2.spawn();
               room7Wave2.spawn();
           }

           if(!roomSevenBarriersCreated) {
               //barriers on top
               new RoomBarrier(game, 8, 35, player, room7RangedWave1, room7Wave1, room7RangedWave2, room7Wave2);
               new RoomBarrier(game, 9, 35, player, room7RangedWave1, room7Wave1, room7RangedWave2, room7Wave2);
               new RoomBarrier(game, 10,35, player, room7RangedWave1, room7Wave1, room7RangedWave2, room7Wave2);

               //barriers on the right
               new RoomBarrier(game, 20, 40, player, room7RangedWave1, room7Wave1, room7RangedWave2, room7Wave2);
               new RoomBarrier(game, 20, 41, player, room7RangedWave1, room7Wave1, room7RangedWave2, room7Wave2);
               new RoomBarrier(game, 20, 42, player, room7RangedWave1, room7Wave1, room7RangedWave2, room7Wave2);

               roomSevenBarriersCreated = true;
           }
       }else if(player.currentRoom == 8) {
           //spawn first wave
           room8RangedWave1.spawn();
           room8Wave1.spawn();

           escape.trackSpawner(room8RangedWave1);
           escape.trackSpawner(room8Wave1);
           escape.trackSpawner(room8RangedWave2);
           escape.trackSpawner(room8Wave2);
           escape.trackSpawner(room8RangedWave3);
           escape.trackSpawner(room8Wave3);

           // spawn second wave
           if(room8RangedWave1.enemiesAlive <= 0 && room8Wave1.enemiesAlive <= 0) {
               room8RangedWave2.spawn();
               room8Wave2.spawn();
           }

           if(room8RangedWave2.enemiesAlive <= 0 && room8Wave2.enemiesAlive <= 0) {
               room8RangedWave3.spawn();
               room8Wave3.spawn();
           }

           if(!roomEightBarriersCreated) {
               //barriers on the top
               new RoomBarrier(game, 30, 35, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2, room8RangedWave3, room8Wave3);
               new RoomBarrier(game, 31, 35, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2, room8RangedWave3, room8Wave3);
               new RoomBarrier(game, 32, 35, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2, room8RangedWave3, room8Wave3);
               new RoomBarrier(game, 33, 35, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2, room8RangedWave3, room8Wave3);

               new RoomBarrier(game, 19, 40, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2, room8RangedWave3, room8Wave3);
               new RoomBarrier(game, 19, 41, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2, room8RangedWave3, room8Wave3);
               new RoomBarrier(game, 19, 42, player, room8RangedWave1, room8Wave1, room8RangedWave2, room8Wave2, room8RangedWave3, room8Wave3);

               roomEightBarriersCreated = true;
           }
       }else{console.log('In Level3: error player is currently not in room 1-8');}

    }
};
