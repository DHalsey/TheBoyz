//main.js
var game;
var map, layerCollision;

//global groups
var playerBullets;
var enemyBullets;
var enemyGroup;
var enemyMissiles;
var barriers;
var missileParticles;
var weaponGroup;

//Global variables
var player;
var world_width;
var world_height;
var room_width;
var room_height;
var nextLevel;
var currentLevel;
var barrierText;
var barrierTween;
var switchText;
var switchTween;

//upgrader global variables
var healthUpgraded = false;
var pistolUpgraded = false;
var rifleUpgraded = false;
var shotgunUpgraded = false;
var dashEnabled = false;
var statChanger;
var reticle;

window.onload = function(){
    game = new Phaser.Game(1280,768, Phaser.AUTO);
    game.state.add('Boot', Boot);
    game.state.add('Preloader', Preloader);
    game.state.add('Menu', Menu);
    game.state.add('Play', Play);
    game.state.add('Level2', Level2);
    game.state.add('Level3', Level3);
    game.state.add('Lose', Lose);
    game.state.add('Win', Win);
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

		// Load Images ----------------------------------------------------------------------------------------------------
		game.load.path = 'assets/img/';
		game.load.atlas('atlas', 'atlas.png', 'atlas.json');
		game.load.image('enemyMissile','enemyMissile.png');
		game.load.image('player','player.png');
		game.load.image('enemyShooter','enemyShooter.png');
		game.load.image('enemyTank','enemyTank.png');
		game.load.image('enemyCharger','enemyCharger.png');
		game.load.image('enemyFastCharger','enemyFastCharger.png');

    //level 1 tilemap
		game.load.tilemap('maptile','map.json',null,Phaser.Tilemap.TILED_JSON); //tilemap information for tiling

    //level 2 tilemap
    game.load.tilemap('maptile2', 'AustinMap.json', null, Phaser.Tilemap.TILED_JSON);

    //level 3 tilemap
    game.load.tilemap('maptile3', 'Level3Map.json', null, Phaser.Tilemap.TILED_JSON);

		game.load.image('mapImage','MapTiles.png'); //tilemap images
    	game.load.image('mapMAINImage',"TileMAIN.png"); //tilemap images
		game.load.image('rifleSprite', 'weapon_rifle.png');
		game.load.image('shotgunSprite', 'weapon_shotgun.png');
		game.load.image('collisionImage','Collision.png'); //tilemap images
		game.load.image('menuBackgrnd', 'menuBackgrnd.png');
		game.load.image('button', 'button.png');
    	game.load.image('wall', 'wall2.png');
    	game.load.image('escapeImage','escapePoint.png');
    	game.load.image('healthOverlay', 'healthBarOverlay.png');
   		game.load.image('barrier', 'barrier2.png');
    	game.load.image('missileParticle1', 'missileParticle3.png');
      	game.load.image('missileParticle2', 'missileParticle5.png');
        game.load.image('missileParticle3', 'missileParticle1.png');
        game.load.image('missileParticle4', 'missileParticle2.png');
        game.load.image('genericButton', 'genericButton.png');
        game.load.image('reticle', 'reticle.png');
        game.load.image('pressE', 'tempEKey.png');
        game.load.image('bulletLine', 'bulletLine.png');
        game.load.image('bulletLine2', 'bulletLine2.png');
        game.load.image('muzzleParticle', 'muzzleParticle.png');
        game.load.image('muzzleParticle2', 'muzzleParticle2.png');
        game.load.image('dashParticle', 'dashParticle1.png');
        game.load.image('dashParticle2', 'dashParticle2.png');

        // Load Audio ----------------------------------------------------------------------------------------------------
        game.load.path = 'assets/audio/';
        game.load.audio('pistolAud', ['pistol.mp3', 'pistol.ogg']);
        game.load.audio('shotgunAud', ['shotgun.mp3', 'shotgun.ogg']);
        game.load.audio('rifleAud', ['rifle.mp3', 'rifle.ogg']);
        game.load.audio('smgAud', ['smg.mp3', 'smg.ogg']);
        game.load.audio('hitMarker', ['hitmarker.mp3', 'hitmarker.ogg']);
	    game.load.audio('dash2', ['dash2.mp3', 'dash2.ogg']);
	    game.load.audio('missileExplosion', ['missileExplosion.mp3', 'missileExplosion.ogg']);
	    game.load.audio('shootMissile', ['shootMissile.mp3', 'shootMissile.ogg']);
	    game.load.audio('dashTimer1', ['dashTimer1.mp3', 'dashTimer1.ogg']);
	    game.load.audio('dashTimer2', ['dashTimer2.mp3', 'dashTimer2.ogg']);
	    game.load.audio('woosh', ['woosh.mp3', 'woosh.ogg']);
	    game.load.audio('playMusic', ['reallyBadSong.mp3', 'reallyBadSong.ogg']);
	    game.load.audio('hpPickup', ['hpPickup.mp3', 'hpPickup.ogg']);
	    game.load.audio('escape', ['escape2.mp3', 'escape2.ogg']);
	    game.load.audio('chooseUpgrade', ['chooseUpgrade.mp3', 'chooseUpgrade.ogg']);

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
		var menuTitle = game.add.text(80, 80, 'Soccer Dragon',
			{font: '50px Arial', fill: '#000000'});

		//adds button to press
		this.button = game.add.button(game.world.centerX, game.world.centerY,
			'button', this.actionOnClick, this);
        this.button.inputEnabled = true;
        this.button.input.useHandCursor = false;

        reticle = game.add.sprite(game.input.activePointer.x - 8, game.input.activePointer.y - 8, 'reticle');
        reticle.anchor.setTo(0.5);

    //initialize the stat changer
    statChanger = new PlayerStatChanger();
	},
	update: function(){
		reticle.x = game.input.activePointer.x;
        reticle.y = game.input.activePointer.y;
        if (reticle.overlap(this.button)) reticle.scale.setTo(1.5, 1.5);
        else reticle.scale.setTo(1, 1);
	},

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
};
Play.prototype = {
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
        game.stage.setBackgroundColor('#FFFFFF');
        game.world.setBounds(0,0,world_width,world_height);




        levelSelect(1);

        //add audio
        playMusic = game.add.audio('playMusic');
        playMusic.volume -= .5;
        playMusic.loopFull();
        pistolAud = game.add.audio('pistolAud');
        pistolAud.volume -= .8;
        rifleAud = game.add.audio('rifleAud');
        rifleAud.volume -= .8;
        shotgunAud = game.add.audio('shotgunAud');
        shotgunAud.volume -= .8;
        smgAud = game.add.audio('smgAud');
        smgAud.volume -= .8;
        hitMarker = game.add.audio('hitMarker');
        dashAud = game.add.audio('dash2');
        dashAud.volume -= .5
        shootMissileAud = game.add.audio('shootMissile');
        shootMissileAud.volume -= .8;
        missileExplosionAud = game.add.audio('missileExplosion');
        missileExplosionAud.volume -= .8;
        dashTimer1Aud = game.add.audio('dashTimer1');
        dashTimer1Aud.volume -= .7;
        dashTimer2Aud = game.add.audio('dashTimer2');
        dashTimer2Aud.volume -= .7;
        roomSwitchAud = game.add.audio('woosh');
        hpPickupAud = game.add.audio('hpPickup');
        hpPickupAud.volume = .8;
        escapeAud = game.add.audio('escape');
        escapeAud.volume = .8;
        chooseUpgradeAud = game.add.audio('chooseUpgrade');
        chooseUpgradeAud.volume = .8;


        //create groups
        playerBullets = game.add.physicsGroup();
        enemyBullets = game.add.physicsGroup();
        enemyGroup = game.add.physicsGroup();
        enemyMissiles = game.add.physicsGroup();
        missileParticles = game.add.physicsGroup();
        barriers = game.add.group();
        weaponGroup = game.add.group();

        player = new Player(game, 200, 200, 'atlas', 'player0001', 15);

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



       //Create the escape point
       //It will spawn randomly at one of the 3 points that I provided it
       //the 'Level2' in the last argument is so that the EscapePoint knows what state to start when the player collides with it
       escape = new EscapePoint(game, [new SpawnPoint(38,22), new SpawnPoint(1,13), new SpawnPoint(29, 2)], player);

      // var rifle = new Weapon(game, room_width/2, room_height/2, 'rifleSprite', 'RIFLE', player);
       //var shotgun = new Weapon(game, room_width/2 + 100, room_height/2, 'shotgunSprite', 'SHOTGUN', player);
       //var smg = new Weapon(game, room_width/2 + 200, room_height/2, 'wall', 'SMG', player);

       createHealthBar();

       roomAnchors();

       // Ammo indicator
       ammoText = createAmmoText(player);

       roomOneBarriersCreated = false;
       roomTwoBarriersCreated = false;
       roomThreeBarriersCreated = false;
       roomFourBarriersCreated = false;

       reticle = game.add.sprite(game.input.activePointer.x - 8, game.input.activePointer.y - 8, 'reticle');
       reticle.anchor.setTo(0.5);

       debugCreate();
	},

	update: function(){
		debugUpdate() //uncomment to draw debug information

        game.physics.arcade.collide(player, layerCollision);

        game.physics.arcade.collide(enemyGroup, layerCollision);

        roomTransition(player, room_width, room_height);
        updateHealthBar();

        reticle.x = game.input.activePointer.x + game.camera.x;
        reticle.y = game.input.activePointer.y + game.camera.y;

        //if the player switches rooms, update the escape point so that it tracks that room's spawners
        //also spawn that room's enemies
        if(player.currentRoom == 1) {

        }
        else if(player.currentRoom == 2) {
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
        else if(player.currentRoom == 3) {
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
        else if(player.currentRoom == 4) {
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
			game.state.start(currentLevel);
	},
};
var Win = function(game){};
Win.prototype = 
{
	preload: function(){},
	create: function()
	{
		//adds background
		winBG = game.add.image(0,0, 'menuBackgrnd');

		//adds text
		var winTitle = game.add.text(80,80, 'You Survived!!!',
			{font: '50px Arial', fill: '#ffffff'});
		var winText = game.add.text(80,200, 'Has it been 4 years already?\n I guess we can elect someone new now.\n\n Press "R" to Restart',
			{ffont: '25px Arial', fill: '#ffffff'});
		this.rkey = game.input.keyboard.addKey(Phaser.Keyboard.R);
	},
	update: function()
	{
		if(this.rkey.justPressed())
			game.state.start('Play');
	},
};
