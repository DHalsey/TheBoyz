//Level4.js

var Level4 = function(game) {
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
Level4.prototype = {
    preload: function(){
	},
	create: function(){
        world_width = 3840; //The world has been set to be 3x3 rooms big
        world_height= 2304;
        room_width = 1280;
        room_height= 768;

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

        player = new Player(game, (3*64)+32, (1*64)+32, 200, 'atlas', 'player0001', 15);
        //update the player's stats
        updateStats(player, statChanger);

       createHealthBar();

       level4RoomAnchors();

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

        level4RoomTransition(player, room_width, room_height);
        updateHealthBar();

       //Update ammoText
       updateAmmoText(ammoText, player);

       reticle.x = game.input.activePointer.x + game.camera.x;
       reticle.y = game.input.activePointer.y + game.camera.y;
    }
};