//main.js
var game;

window.onload = function(){
	game = new Phaser.Game(1280,720, Phaser.AUTO);
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
        player = new Player(game, 200, 200, 'atlas', 'player0001', 10);
        enemy = new Enemy1(game, 400, 200, 'atlas', 'player0002', 5, player);
	},
	update: function(){
        
	}
};