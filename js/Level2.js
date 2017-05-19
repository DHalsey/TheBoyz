//Level2.js

var Level2 = function(game) {
  var roomOneSpawner, roomTwoSpawner, roomThreeSpawner, roomFourSpawner, escape, healthBar;
  var roomOneBarriersCreated;
  var roomTwoBarriersCreated;
  var roomThreeBarriersCreated;
  var roomFourBarriersCreated;
  var barrierDelay;
};
Level2.prototype = {
    preload: function(){
	},
	create: function(){
        world_width = 2560; //The world has been set to be 2x2 rooms big
        world_height= 1536;
        room_width = 1280;
        room_height= 768;

        //start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set world size and adjust color to white
        game.stage.setBackgroundColor('#ffffff');
        game.world.setBounds(0,0,world_width,world_height);

		    levelSelect(1);

        //create groups
        playerBullets = game.add.physicsGroup();
        enemyBullets = game.add.physicsGroup();
        enemyGroup = game.add.physicsGroup();
        enemyMissiles = game.add.physicsGroup();

        player = new Player(game, 200, 200, 'atlas', 'player0001', 10);

       //this spawner will spawn one of each enemy type at the four passed in spawn points.
       roomOneSpawner = new EnemySpawner(["BasicCharger", "MissileLauncher"], [new SpawnPoint(1,1), new SpawnPoint(9, 5), new SpawnPoint(3, 10), new SpawnPoint(18,2)], player);
       roomTwoSpawner = new EnemySpawner(['BasicShooter'], [new SpawnPoint(30,5)], player);
       roomThreeSpawner = new EnemySpawner(['BasicCharger'], [new SpawnPoint(8, 16)], player);
       roomFourSpawner = new EnemySpawner(['FastCharger'], [new SpawnPoint(29, 16)], player);

       //HERE IS ANOTHER EXAMPLE FOR HOW THE SPAWNER CAN BE USED
       //this one will spawn in 2 shooting enemies and one fast charer in a random order at THREE of the given FIVE spawn points
       //I made this example to illustrate that you can set more poossible spawn points than enemies to spawn
       //this could be a good way to add some extra randomness if we so choose
       //note also that you can pass random integers as arguments to the SpawnPoint constructors
       //i haven't called spawn() on this spawner, so the enemies won't actually show up in the game, but you get the point
       var exampleSpawner = new EnemySpawner(["BasicShooter", "BasicShooter", "FastCharger"], [new SpawnPoint(1,4), new SpawnPoint(15, 1), new SpawnPoint(5, 6), new SpawnPoint(10,10), new SpawnPoint(11,3)], player);

       //Create the escape point
       //It will spawn randomly at one of the 3 points that I provided it
       //the 'Level2' in the last argument is so that the EscapePoint knows what state to start when the player collides with it
       escape = new EscapePoint(game, [new SpawnPoint(38,22), new SpawnPoint(1,13), new SpawnPoint(29, 2)], player, 'Level2');

       var rifle = new Weapon(game, room_width/2, room_height/2, 'rifleSprite', 'RIFLE', player);
       var shotgun = new Weapon(game, room_width/2 + 100, room_height/2, 'shotgunSprite', 'SHOTGUN', player);

       createHealthBar();

       roomAnchors();

       // Ammo indicator
      ammoText = createAmmoText(player);

       roomOneBarriersCreated = false;
       roomTwoBarriersCreated = false;
       roomThreeBarriersCreated = false;
       roomFourBarriersCreated = false;
       barrierDelay = 500;

       game.add.text(80, 80, 'Level 2',{font: '100px Arial', fill: '#000000'});
	},

	update: function(){

        game.physics.arcade.collide(player, layerCollision);

        game.physics.arcade.collide(enemyGroup, layerCollision);

        roomTransition(player, room_width, room_height);
        updateHealthBar();

        //if the player switches rooms, update the escape point so that it tracks that room's spawners
        //also spawn that room's enemies
        if(player.currentRoom == 1 && game.time.now > player.timeSwitched+barrierDelay) {
          roomOneSpawner.spawn();
          escape.trackSpawner(roomOneSpawner);
          if(!roomOneBarriersCreated) {  //if the room one barriers haven't been created yet, create them

            //create barriers on the right side of room 1
            new RoomBarrier(game, 20, 6, player, roomOneSpawner);
            new RoomBarrier(game, 20, 5, player, roomOneSpawner);

            //create barriers on the bottom of room 1
            new RoomBarrier(game, 8, 12, player, roomOneSpawner);
            new RoomBarrier(game, 9, 12, player, roomOneSpawner);
            new RoomBarrier(game, 10, 12, player, roomOneSpawner);
            new RoomBarrier(game, 11, 12, player, roomOneSpawner);

            roomOneBarriersCreated = true;
          }
        } 
        else if(player.currentRoom == 2 && game.time.now > player.timeSwitched+barrierDelay) { 
          roomTwoSpawner.spawn();
          escape.trackSpawner(roomTwoSpawner);
          if(!roomTwoBarriersCreated) { //if room 2 barriers haven't been created yet, create them
            
            //barriers on the left side of room 2
            new RoomBarrier(game, 19, 6, player, roomTwoSpawner);
            new RoomBarrier(game, 19, 5, player, roomTwoSpawner);

            //barriers on the bottom of room 2
            new RoomBarrier(game, 38, 12, player, roomTwoSpawner);
            new RoomBarrier(game, 37, 12, player, roomTwoSpawner);
            new RoomBarrier(game, 36, 12, player, roomTwoSpawner);
            new RoomBarrier(game, 35, 12, player, roomTwoSpawner);

            roomTwoBarriersCreated = true;
          }
        } 
        else if(player.currentRoom == 3 && game.time.now > player.timeSwitched+barrierDelay) {
          roomThreeSpawner.spawn();
          escape.trackSpawner(roomThreeSpawner);
          if(!roomThreeBarriersCreated) {

            //barriers on the top of room 3
            new RoomBarrier(game, 8, 11, player, roomThreeSpawner);
            new RoomBarrier(game, 9, 11, player, roomThreeSpawner);
            new RoomBarrier(game, 10, 11, player, roomThreeSpawner);
            new RoomBarrier(game, 11, 11, player, roomThreeSpawner);

            //barriers on the right side of room 3
            new RoomBarrier(game, 20, 19, player, roomThreeSpawner);
            new RoomBarrier(game, 20, 20, player, roomThreeSpawner);
            new RoomBarrier(game, 20, 21, player, roomThreeSpawner);

            roomThreeBarriersCreated = true;
          }
        } 
        else if(player.currentRoom == 4 && game.time.now > player.timeSwitched+barrierDelay) {
          roomFourSpawner.spawn();
          escape.trackSpawner(roomFourSpawner);
          if(!roomFourBarriersCreated) {

            //barriers on the left side of room 4
            new RoomBarrier(game, 19, 19, player, roomFourSpawner);
            new RoomBarrier(game, 19, 20, player, roomFourSpawner);
            new RoomBarrier(game, 19, 21, player, roomFourSpawner);

            //barriers on the top of room 4
            new RoomBarrier(game, 38, 11, player, roomFourSpawner);
            new RoomBarrier(game, 37, 11, player, roomFourSpawner);
            new RoomBarrier(game, 36, 11, player, roomFourSpawner);
            new RoomBarrier(game, 35, 11, player, roomFourSpawner);

            roomFourBarriersCreated = true;
          }
        }

       //Update ammoText
       updateAmmoText(ammoText, player);
        
    }
};