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

var Play = function(game) {
    var player
    var game_width;
    var game_height;
    var room_width;
    var room_height;
};
Play.prototype = {
    preload: function(){

    },
    create: function(){
        game_width = 2560;
        game_height= 1536;
        room_width = 1280;
        room_height= 768;

        var map = game.add.tilemap('maptile');
        map.addTilesetImage('Map','mapImage');
        layer = map.createLayer('worldMain'); //main world layer
        game.world.setBounds(0,0,game_width,game_height);
        player = new Player(game, 200, 200, 'atlas', 'player0001', 10);
        enemy = new Enemy1(game, 400, 200, 'atlas', 'player0002', 5, player);
        var rifle = new Weapon(game, game.world.width/2, game.world.height/2, 'rifleSprite', 'rifle', 
            100, player);
        //create groups
        bullets = game.add.physicsGroup();

        //camera
        Room1 = new RoomAnchor(game,room_width/2, room_height/2);
        Room2 = new RoomAnchor(game,room_width*1.5, room_height/2);
        Room3 = new RoomAnchor(game,room_width/2, room_height*1.5);
        Room4 = new RoomAnchor(game,room_width*1.5, room_height*1.5);
        game.camera.follow(Room1);

    },
    update: function(){
        if(player.position.x < room_width && player.position.y < room_height) {
            game.camera.follow(Room1);
        }else if(player.position.x < room_width*2 && player.position.y < room_height) {
            game.camera.follow(Room2);
        }else if(player.position.x < room_width && player.position.y < room_height*2) {
            game.camera.follow(Room3);
        }else if(player.position.x < room_width*2 && player.position.y < room_height*2) {
            game.camera.follow(Room4);
        }
    }
};
