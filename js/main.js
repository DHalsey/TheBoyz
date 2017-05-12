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

var Play = function(game) {};
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
       var roomOneSpawner = new EnemySpawner(["BasicCharger", "BasicShooter", "TankyCharger", "FastCharger"], [new SpawnPoint(1,1), new SpawnPoint(9, 5), new SpawnPoint(3, 10), new SpawnPoint(18,2)], player);
       roomOneSpawner.spawn();

       //HERE IS ANOTHER EXAMPLE FOR HOW THE SPAWNER CAN BE USED
       //this one will spawn in 2 shooting enemies and one fast charer in a random order at the given spawn points
       var exampleSpawner = new EnemySpawner(["BasicShooter", "BasicShooter", "FastCharger"], new SpawnPoint(1,4), new SpawnPoint(15, 1), new SpawnPoint(5, 6), player);

        var rifle = new Weapon(game, room_width/2, room_height/2, 'rifleSprite', 'rifle', 100, player);

        roomAnchors();
	},
	update: function(){
        game.physics.arcade.collide(player, layerCollision);

        game.physics.arcade.collide(enemyGroup, layerCollision);

        roomTransition(player, room_width, room_height);
	}
};


