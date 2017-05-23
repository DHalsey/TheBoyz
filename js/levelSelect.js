function levelSelect(level){
	if(level==1){
		map = game.add.tilemap('maptile');
        map.addTilesetImage('Map','mapImage');
        map.addTilesetImage('MAIN','mapMAINImage');
        layerMain = map.createLayer('1-Base'); //main world layer
        layerDetail = map.createLayer('1-Detail'); //main world layer
        map.addTilesetImage('Collision','collisionImage');
        layerCollision = map.createLayer('1-Collision'); //main world layer

        map.setCollisionBetween(0, 100,true,'1-Collision');
        layerMain.resizeWorld();
        layerCollision.visible = false;
        layerCollision.debug = true;
        game.physics.arcade.enable(map);
    } else if (level==2){
        map = game.add.tilemap('maptile2');
        map.addTilesetImage('Map','mapImage');
        map.addTilesetImage('MAIN','mapMAINImage');
        layerMain = map.createLayer('2-Base'); //main world layer
        layerDetail = map.createLayer('2-Detail'); //main world layer
        map.addTilesetImage('Collision','collisionImage');
        layerCollision = map.createLayer('2-Collision'); //main world layer

        map.setCollisionBetween(0, 100,true,'2-Collision');
        layerMain.resizeWorld();
        layerCollision.visible = false;
        layerCollision.debug = true;
        game.physics.arcade.enable(map);
    } else if (level==3){
    	
    } else if (level==4){
    	
    } else if (level==5){
    	
    }
}