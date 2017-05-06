//main.js
var game;

//global groups
var bullets;

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
		var map = game.add.tilemap('maptile');
        map.addTilesetImage('Map','mapImage');
        layer = map.createLayer('worldMain'); //main world layer
        player = new Player(game, 200, 200, 'atlas', 'player0001', 10);
        enemy = new Enemy1(game, 400, 200, 'atlas', 'player0002', 5, player);
        var rifle = new Weapon(game, game.world.width/2, game.world.height/2, 'rifleSprite', 'rifle', 
        	100, player);
        //create groups
        bullets = game.add.physicsGroup();

	},
	update: function(){
        
	}
};
