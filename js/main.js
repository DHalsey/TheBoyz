//main.js
var game;
var map, layerCollision;

//global groups
var playerBullets;
var enemyBullets;
var enemyGroup;

//Global variables
var player;
var world_width;
var world_height;
var room_width;
var room_height;

window.onload = function(){
    game = new Phaser.Game(1280,768, Phaser.AUTO);
    game.state.add('Preloader', Preloader);
    game.state.add('Menu', Menu);
    game.state.add('Play', Play);
    game.state.start('Preloader');
};

var Preloader = function(game) {};
Preloader.prototype = {
	preload: function(){
		//load images
		game.load.path = 'assets/img/';
		game.load.atlas('atlas', 'atlas.png', 'atlas.json');
		game.load.tilemap('maptile','map.json',null,Phaser.Tilemap.TILED_JSON); //tilemap information for tiling
		game.load.image('mapImage','MapTiles.png'); //tilemap images
		game.load.image('rifleSprite', 'weapon_rifle.png');
		game.load.image('collisionImage','Collision.png'); //tilemap images     
		game.load.image('menuBackgrnd', 'menuBackgrnd.png');
		game.load.image('button', 'button.png');
        game.load.image('wall', 'wall.png');
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

	},
	update: function(){},

	actionOnClick: function()
	{
		game.state.start('Play');
	}
};

var Play = function(game) {var roomOneSpawner;};
Play.prototype = {
    preload: function(){
	},
	create: function(){
        world_width = 2560; //The world has been set to be 2x2 rooms big
        world_height= 1536;
        room_width = 1280;
        room_height= 768;

        //Set world size and adjust color to white
        game.stage.setBackgroundColor('#ffffff');
        game.world.setBounds(0,0,world_width,world_height);

		map = game.add.tilemap('maptile');
        map.addTilesetImage('Map','mapImage');
        layerMain = map.createLayer('worldMain'); //main world layer

        map.addTilesetImage('Collision','collisionImage');
        layerCollision = map.createLayer('CollisionBounds'); //main world layer
        map.setCollisionBetween(6, 9,true,'CollisionBounds');
        layerMain.resizeWorld();
        layerCollision.visible = false;
        layerCollision.debug = true;
        game.physics.arcade.enable(map);

        //create groups
        playerBullets = game.add.physicsGroup();
        enemyBullets = game.add.physicsGroup();
        enemyGroup = game.add.physicsGroup();
        
        player = new Player(game, 200, 200, 'atlas', 'player0001', 10);
     
       //this spawner will spawn one of each enemy type at the four passed in spawn points. 
       roomOneSpawner = new EnemySpawner(["BasicCharger", "BasicShooter", "TankyCharger", "FastCharger"], [new SpawnPoint(1,1), new SpawnPoint(9, 5), new SpawnPoint(3, 10), new SpawnPoint(18,2)], player);
       roomOneSpawner.spawn();
       testSpawner = new EnemySpawner(['BasicShooter'], [new SpawnPoint(3,3)], player);
       testSpawner.spawn();

       //room one barriers
       //these barriers are tracking the enemies from both roomOneSpawner and testSpawner
       //when all of the enemies from both of these spawners are dead, the barriers will despawn
       //RoomBarriers can track the enemies from up to 5 spawners
       //they can be used for just 1 spawner also
       //I added this functionality just in case we want to have more than 1 spawner per room
       //NOTE: I placed the barriers where they are right now so that you could see how they work
       //      I suggest that we move them 1 block offscreen so that they function more like invisible walls
       //      This way we can avoid problems when we place them every time the player switches rooms
       new RoomBarrier(game, 19, 6, player, roomOneSpawner, testSpawner);
       new RoomBarrier(game, 19, 5, player, roomOneSpawner, testSpawner);
       new RoomBarrier(game, 8, 11, player, roomOneSpawner, testSpawner);
       new RoomBarrier(game, 9, 11, player, roomOneSpawner, testSpawner);
       new RoomBarrier(game, 10, 11, player, roomOneSpawner, testSpawner);
       new RoomBarrier(game, 11, 11, player, roomOneSpawner, testSpawner);


       //HERE IS ANOTHER EXAMPLE FOR HOW THE SPAWNER CAN BE USED
       //this one will spawn in 2 shooting enemies and one fast charer in a random order at THREE of the given FIVE spawn points
       //I made this example to illustrate that you can set more poossible spawn points than enemies to spawn
       //this could be a good way to add some extra randomness if we so choose
       //note also that you can pass random integers as arguments to the SpawnPoint constructors
       //i haven't called spawn() on this spawner, so the enemies won't actually show up in the game, but you get the point
       var exampleSpawner = new EnemySpawner(["BasicShooter", "BasicShooter", "FastCharger"], [new SpawnPoint(1,4), new SpawnPoint(15, 1), new SpawnPoint(5, 6), new SpawnPoint(10,10), new SpawnPoint(11,3)], player);

        var rifle = new Weapon(game, room_width/2, room_height/2, 'rifleSprite', 'rifle', 100, player);

        roomAnchors();
	},
	update: function(){

        game.physics.arcade.collide(player, layerCollision);

        game.physics.arcade.collide(enemyGroup, layerCollision);

        roomTransition(player, room_width, room_height);
	}
};


