//main.js
var game;
var map, layerCollision;

//global groups
var playerBullets;
var enemyBullets;
var enemies;

window.onload = function(){
	game = new Phaser.Game(1280,768, Phaser.AUTO);
	game.state.add('Preloader', Preloader);
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
	},
	create: function(){
		game.state.start('Play');
	}
};

var Play = function(game) {var player};
Play.prototype = {
	preload: function(){

	},
	create: function(){
		map = game.add.tilemap('maptile');
        map.addTilesetImage('Map','mapImage');
        layerMain = map.createLayer('worldMain'); //main world layer

        map.addTilesetImage('Collision','collisionImage');
        layerCollision = map.createLayer('CollisionBounds'); //main world layer
        map.setCollisionBetween(6, 9,true,'CollisionBounds');
        layerMain.resizeWorld();
        layerCollision.debug = true;
        
        player = new Player(game, 200, 200, 'atlas', 'player0001', 10);
        enemy = new BasicCharger(game, 400, 200, 'atlas', 'player0002', player);
        enemy2 = new BasicShooter(game, 600, 50, 'atlas', 'player0002', player);
        enemy3 = new TankyCharger(game, 650, 400, 'atlas', 'player0002', player);
        enemy4 = new FastCharger(game, 800, 400, 'atlas', 'player0002', player);

        var rifle = new Weapon(game, game.world.width/2, game.world.height/2, 'rifleSprite', 'rifle', 100, player);

        game.physics.arcade.enable(map);

        //create groups
        playerBullets = game.add.physicsGroup();
        enemyBullets = game.add.physicsGroup();
	},
	update: function(){
        game.physics.arcade.collide(player, layerCollision);
	}
};


