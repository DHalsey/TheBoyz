//main.js
var game;
var map, layerCollision;

//global groups
var playerBullets;
var enemyBullets;
var enemyGroup;
var enemyMissiles;

//Global variables
var player;
var world_width;
var world_height;
var room_width;
var room_height;
var nextLevel;

//upgrader global variables
var healthUpgraded = false;
var pistolUpgraded = false;
var rifleUpgraded = false;
var shotgunUpgraded = false;
var dashEnabled = false;
var statChanger;

window.onload = function(){
    game = new Phaser.Game(1280,768, Phaser.AUTO);
    game.state.add('Boot', Boot);
    game.state.add('Preloader', Preloader);
    game.state.add('Menu', Menu);
    game.state.add('Play', Play);
    game.state.add('Level2', Level2);
    game.state.add('Lose', Lose);
    game.state.add('Upgrade', Upgrade);
    game.state.start('Boot');
};

var Boot = function(game) {};
Boot.prototype = {
    preload: function() {
        game.load.path = 'assets/img/';
        game.load.image('loadBackground', 'loadBackground.png');
        game.load.image('loadbar', 'loadbar.png');
    },
    create: function() {
        game.state.start('Preloader');
    }
};

var Preloader = function(game) {};
Preloader.prototype = {
	preload: function(){
        //add loading screen background
        game.add.image(0, 0, 'loadBackground');

        //display text
        game.add.text(20, 20, 'Loading...', {fontSize: '32px', fill: 'white'});

       // add preloader bar and set as preloader sprite (auto-crops sprite)
        var preloadBar = game.add.sprite(game.world.centerX-100, game.world.centerY,'loadbar');
        game.load.setPreloadSprite(preloadBar);
		//load images
		game.load.path = 'assets/img/';
		game.load.atlas('atlas', 'atlas.png', 'atlas.json');
		game.load.image('player','player.png');
		game.load.image('enemyShooter','enemyShooter.png');
		game.load.image('enemyTank','enemyTank.png');
		game.load.image('enemyCharger','enemyCharger.png');
		game.load.image('enemyFastCharger','enemyFastCharger.png');
		game.load.tilemap('maptile','map.json',null,Phaser.Tilemap.TILED_JSON); //tilemap information for tiling
		game.load.image('mapImage','MapTiles.png'); //tilemap images
    	game.load.image('cityImage','CityTiles.png'); //tilemap images
    	game.load.image('mapMAINImage',"TileMAIN"); //tilemap images
		game.load.image('rifleSprite', 'weapon_rifle.png');
		game.load.image('shotgunSprite', 'weapon_shotgun.png');
		game.load.image('collisionImage','Collision.png'); //tilemap images
		game.load.image('menuBackgrnd', 'menuBackgrnd.png');
		game.load.image('button', 'button.png');
    	game.load.image('wall', 'wall2.png');
    	game.load.image('healthOverlay', 'healthBarOverlay.png');
   		game.load.image('barrier', 'barrier2.png');
    	game.load.image('missileParticle4', 'missileParticle4.png');
        game.load.image('genericButton', 'genericButton.png');
    	game.load.path = 'assets/audio/';
    	game.load.audio('pistolAud', ['pistol.mp3', 'pistol.ogg']);
    	game.load.audio('shotgunAud', ['shotgun.mp3', 'shotgun.ogg']);
    	game.load.audio('rifleAud', ['rifle.mp3', 'rifle.ogg']);
    	game.load.audio('hitMarker', ['hitmarker.mp3', 'hitmarker.ogg']);
      game.load.audio('dash', ['dash.mp3', 'dash.ogg']);
      game.load.audio('missileExplosion', ['missileExplosion.mp3', 'missileExplosion.ogg']);
      game.load.audio('shootMissile', ['shootMissile.mp3', 'shootMissile.ogg']);

	},
	create: function(){
		game.state.start('Menu');
	}
};


//starts the main menu state
var Menu = function(game){};
Menu.prototype =
{
	preload: function(){},

	create: function()
	{
		//adds background
		menuBG = game.add.image(0,0, 'menuBackgrnd');

		//adds menu text
		var menuTitle = game.add.text(80, 80, 'Fyre Fight',
			{font: '50px Arial', fill: '#000000'});

		//adds button to press
		var button = game.add.button(game.world.centerX, game.world.centerY,
			'button', this.actionOnClick, this);
        button.inputEnabled = true;
        button.input.useHandCursor = false;


    //initialize the stat changer
    statChanger = new PlayerStatChanger();
	},
	update: function(){},

	actionOnClick: function()
	{
		game.state.start('Play');
	},
};

var Play = function(game) {
  var roomTwoFast, roomTwoCharger, roomThreeCharger, roomThreeFast, roomThreeTanky, roomFourCharger,roomFourTanky, escape, healthBar;
  var roomTwoBarriersCreated;
  var roomThreeBarriersCreated;
  var roomFourBarriersCreated;
  var barrierDelay;
};
Play.prototype = {
    preload: function(){
	},
	create: function(){
        world_width = 2560; //The world has been set to be 2x2 rooms big
        world_height= 1536;
        room_width = 1280;
        room_height= 768;

        //what level is next
        nextLevel = 'Level2';

        //start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set world size and adjust color to white
        game.stage.setBackgroundColor('#ffffff');
        game.world.setBounds(0,0,world_width,world_height);

		


        levelSelect(1);

        //add audio
        pistolAud = game.add.audio('pistolAud');
        pistolAud.volume -= .8;
        rifleAud = game.add.audio('rifleAud');
        rifleAud.volume -= .8;
        shotgunAud = game.add.audio('shotgunAud');
        shotgunAud.volume -= .8;
        hitMarker = game.add.audio('hitMarker');
        dashAud = game.add.audio('dash');
        dashAud.volume -= .8;
        shootMissileAud = game.add.audio('shootMissile');
        shootMissileAud.volume -= .8;
        missileExplosionAud = game.add.audio('missileExplosion');
        missileExplosionAud.volume -= .8;

        //create groups
        playerBullets = game.add.physicsGroup();
        enemyBullets = game.add.physicsGroup();
        enemyGroup = game.add.physicsGroup();
        enemyMissiles = game.add.physicsGroup();

        player = new Player(game, 200, 200, 'atlas', 'player0001', 10);

       //room 2 spawners
       roomTwoFast = new EnemySpawner(['FastCharger'], [new SpawnPoint(29,6)], player);
       roomTwoCharger = new EnemySpawner(['BasicCharger'], [new SpawnPoint(37,2)], player);

       //room 3 spawners
       roomThreeFast = new EnemySpawner(['FastCharger'], [new SpawnPoint(2,14)], player);
       roomThreeTanky = new EnemySpawner(['TankyCharger'], [new SpawnPoint(2,21)], player);
       roomThreeCharger = new EnemySpawner(['BasicCharger'], [new SpawnPoint(18,21)], player);

       //room 4 spawners
       roomFourCharger = new EnemySpawner(['BasicCharger'], [new SpawnPoint(23,15)], player);
       roomFourTanky = new EnemySpawner(['TankyCharger'], [new SpawnPoint(36,21)], player);

      

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
       escape = new EscapePoint(game, [new SpawnPoint(38,22), new SpawnPoint(1,13), new SpawnPoint(29, 2)], player);

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
	},

	update: function(){
		//debug() //uncomment to draw debug information
        game.physics.arcade.collide(player, layerCollision);

        game.physics.arcade.collide(enemyGroup, layerCollision);

        roomTransition(player, room_width, room_height);
        updateHealthBar();

        //if the player switches rooms, update the escape point so that it tracks that room's spawners
        //also spawn that room's enemies
        if(player.currentRoom == 1 && game.time.now > player.timeSwitched+barrierDelay) {
          
        } 
        else if(player.currentRoom == 2 && game.time.now > player.timeSwitched+barrierDelay) { 
          roomTwoCharger.spawn();
          roomTwoFast.spawn()
          escape.trackSpawner(roomTwoCharger);
          escape.trackSpawner(roomTwoFast);
          if(!roomTwoBarriersCreated) { //if room 2 barriers haven't been created yet, create them
            
            //barriers on the left side of room 2
            new RoomBarrier(game, 19, 6, player, roomTwoCharger, roomTwoFast);
            new RoomBarrier(game, 19, 5, player, roomTwoCharger, roomTwoFast);

            //barriers on the bottom of room 2
            new RoomBarrier(game, 38, 12, player, roomTwoCharger, roomTwoFast);
            new RoomBarrier(game, 37, 12, player, roomTwoCharger, roomTwoFast);
            new RoomBarrier(game, 36, 12, player, roomTwoCharger, roomTwoFast);
            new RoomBarrier(game, 35, 12, player, roomTwoCharger, roomTwoFast);

            roomTwoBarriersCreated = true;
          }
        } 
        else if(player.currentRoom == 3 && game.time.now > player.timeSwitched+barrierDelay) {
          roomThreeCharger.spawn();
          roomThreeFast.spawn();
          roomThreeTanky.spawn();
          escape.trackSpawner(roomThreeCharger);
          escape.trackSpawner(roomThreeFast);
          escape.trackSpawner(roomThreeTanky);
          if(!roomThreeBarriersCreated) {

            //barriers on the top of room 3
            new RoomBarrier(game, 8, 11, player, roomThreeCharger, roomThreeFast, roomThreeTanky);
            new RoomBarrier(game, 9, 11, player, roomThreeCharger, roomThreeFast, roomThreeTanky);
            new RoomBarrier(game, 10, 11, player, roomThreeCharger, roomThreeFast, roomThreeTanky);
            new RoomBarrier(game, 11, 11, player, roomThreeCharger, roomThreeFast, roomThreeTanky);

            //barriers on the right side of room 3
            new RoomBarrier(game, 20, 19, player, roomThreeCharger, roomThreeFast, roomThreeTanky);
            new RoomBarrier(game, 20, 20, player, roomThreeCharger, roomThreeFast, roomThreeTanky);
            new RoomBarrier(game, 20, 21, player, roomThreeCharger, roomThreeFast, roomThreeTanky);

            roomThreeBarriersCreated = true;
          }
        } 
        else if(player.currentRoom == 4 && game.time.now > player.timeSwitched+barrierDelay) {
          roomFourCharger.spawn();
          roomFourTanky.spawn();
          escape.trackSpawner(roomFourCharger);
          escape.trackSpawner(roomFourTanky);
          if(!roomFourBarriersCreated) {

            //barriers on the left side of room 4
            new RoomBarrier(game, 19, 19, player, roomFourCharger, roomFourTanky);
            new RoomBarrier(game, 19, 20, player, roomFourCharger, roomFourTanky);
            new RoomBarrier(game, 19, 21, player, roomFourCharger, roomFourTanky);

            //barriers on the top of room 4
            new RoomBarrier(game, 38, 11, player, roomFourCharger, roomFourTanky);
            new RoomBarrier(game, 37, 11, player, roomFourCharger, roomFourTanky);
            new RoomBarrier(game, 36, 11, player, roomFourCharger, roomFourTanky);
            new RoomBarrier(game, 35, 11, player, roomFourCharger, roomFourTanky);

            roomFourBarriersCreated = true;
          }
        }

       //Update ammoText
       updateAmmoText(ammoText, player);
        
    }
};


//Lose state
var Lose = function(game){};
Lose.prototype =
{
	preload: function(){},

	create: function()
	{
		//adds background
		loseBG = game.add.image(0,0, 'menuBackgrnd');

		//adds menu text
		var loseTitle = game.add.text(80, 80, 'You Lost',
			{font: '50px Arial', fill: '#ffffff'});
		var loseText = game.add.text(80, 200, 'Press "R" to Restart',
			{font: '25px Arial', fill: '#ffffff'});

		//adds keypress
		this.rkey = game.input.keyboard.addKey(Phaser.Keyboard.R);

	},
	update: function()
	{
		//sends the game back to the play state
		if(this.rkey.justPressed())
			game.state.start('Play');
	},
};


