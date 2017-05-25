//Level3.js

var Level3 = function(game) {
  var roomOneSpawner, roomTwoSpawner, roomThreeSpawner, roomFourSpawner, escape, healthBar;
  var roomOneBarriersCreated;
  var roomTwoBarriersCreated;
  var roomThreeBarriersCreated;
  var roomFourBarriersCreated;
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

        player = new Player(game, 200, 200, 'atlas', 'player0001', 10);
        //update the player's stats
        updateStats(player, statChanger);

       createHealthBar();

       level2RoomAnchors();

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

    }
};
