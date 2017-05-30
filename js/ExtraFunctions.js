//this function returns the angle to ratate thisSprite to, in order to make it face targetSprite
//I based this on phaser's built in method called angleToPointer()
function angleToSprite(thisSprite, targetSprite) {
    var dx = targetSprite.body.x - thisSprite.body.x;
    var dy = targetSprite.body.y - thisSprite.body.y;
    return Math.atan2(dy, dx);
}

//find the distance between two sprites
function distance(sprite1, sprite2) {
    if(sprite1.body != null && sprite2.body!= null) {
        var dx = sprite1.body.x - sprite2.body.x;
        var dy = sprite1.body.y - sprite2.body.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
}

//this function is used to make an enemy charge at the player based on their charegeRate property
//currently only used for FastCharger
function chargeAtPlayer(enemy) {
      if(enemy.distanceToPlayer <= 400 && game.time.now > enemy.nextCharge) {
        enemy.nextCharge = game.time.now + enemy.chargeRate;

        //knockback the enemy towards the direction its facing
        enemy.knockedBack = true;
        knockback(enemy, 700, enemy.rotation - Math.PI);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
      }
}

//this function is used to make an enemy shoot at the playerw a
//requires nextShot and fireRate properties
//currently only used for BasicShooter
function shootPlayer(enemy) {
    if(game.time.now > enemy.nextShot) {
        pistolAud.play();
    	enemy.nextShot = game.time.now + enemy.fireRate;

    	//knock back the enemy
    	enemy.knockedBack = true;
    	knockback(enemy, 150, enemy.rotation);
    	enemy.body.drag.x = 1000;
    	enemy.body.drag.y = 1000;
        new EnemyBullet(game, enemy.x, enemy.y, 'atlas', 'bullet0001', 1);
    }
}

function roomAnchors() {
    //Create RoomAnchors for the camera to follow
    Room1 = new RoomAnchor(game,room_width/2, room_height/2);
    Room2 = new RoomAnchor(game,room_width*1.5, room_height/2);
    Room3 = new RoomAnchor(game,room_width/2, room_height*1.5);
    Room4 = new RoomAnchor(game,room_width*1.5, room_height*1.5);

    // Fix camera on first room
    game.camera.follow(Room1);
}

function level2RoomAnchors() {
    //Create RoomAnchors for the camera to follow
    Room1 = new RoomAnchor(game,room_width/2, room_height/2);
    Room2 = new RoomAnchor(game,room_width*1.5, room_height/2);
    Room3 = new RoomAnchor(game,room_width/2, room_height*1.5);
    Room4 = new RoomAnchor(game,room_width*1.5, room_height*1.5);
    Room5 = new RoomAnchor(game,room_width/2, (room_height*1.5)+room_height);
    Room6 = new RoomAnchor(game,room_width*1.5, (room_height*1.5)+room_height);
    Room7 = new RoomAnchor(game,room_width/2, (room_height*1.5)+room_height*2);
    Room8 = new RoomAnchor(game,room_width*1.5, (room_height*1.5)+room_height*2);
}

function roomTransition(player, room_width, room_height) {
    //Switch Rooms depending where the player is
    if(player.position.x < room_width && player.position.y < room_height) {
        game.camera.follow(Room1 , Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(1);
    }else if(player.position.x < room_width*2 && player.position.y < room_height) {
        game.camera.follow(Room2, Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(2);
    }else if(player.position.x < room_width && player.position.y < room_height*2) {
        game.camera.follow(Room3, Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(3);
    }else if(player.position.x < room_width*2 && player.position.y < room_height*2) {
        game.camera.follow(Room4, Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(4);
    }
}

function level2RoomTransition(player, room_width, room_height) {
    //Switch Rooms depending where the player is
    if(player.position.x < room_width && player.position.y < room_height) {
        game.camera.follow(Room1 , Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(1);
    }else if(player.position.x < room_width*2 && player.position.y < room_height) {
        game.camera.follow(Room2, Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(2);
    }else if(player.position.x < room_width && player.position.y < room_height*2) {
        game.camera.follow(Room3, Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(3);
    }else if(player.position.x < room_width*2 && player.position.y < room_height*2) {
        game.camera.follow(Room4, Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(4);
    }else if(player.position.x < room_width && player.position.y < room_height*3) {
        game.camera.follow(Room5, Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(5);
    }else if(player.position.x < room_width*2 && player.position.y < room_height*3) {
        game.camera.follow(Room6, Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(6);
    }else if(player.position.x < room_width && player.position.y < room_height*4) {
        game.camera.follow(Room7, Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(7);
    }else if(player.position.x < room_width*2 && player.position.y < room_height*4) {
        game.camera.follow(Room8, Phaser.Camera.FOLLOW_LOCKON, .2, .2);
        player.logRoomSwitch(8);
    }
}
function toPointer (displayObject, speed, pointer, maxTime, spread) {

    if (speed === undefined) { speed = 60; }
    pointer = pointer || this.game.input.activePointer;
    if (maxTime === undefined) { maxTime = 0; }

    var angle = player.rotation;
    if (maxTime > 0)
    {
        //  We know how many pixels we need to move, but how fast?
        speed = this.distanceToPointer(displayObject, pointer) / (maxTime / 1000);
    }

    displayObject.body.velocity.x = ((Math.cos(angle) + game.rnd.realInRange(-spread, spread)) * speed);
    displayObject.body.velocity.y = ((Math.sin(angle) + game.rnd.realInRange(-spread, spread)) * speed);

    return angle;

    }

function createHealthBar(positionX, positionY, widthHP, heightHP) {
    if(positionX == undefined){positionX = 64;}
    if(positionY == undefined){positionY = 32;}
    if(widthHP == undefined){widthHP = 192;}
    if(heightHP == undefined){heightHP = 16;}

    meters = game.add.group();

    //create a plain black rectangle as the background of the meter
    var healthBackgroundBitmap = game.add.bitmapData(widthHP, heightHP);
    healthBackgroundBitmap.ctx.beginPath();
    healthBackgroundBitmap.ctx.rect(0, 0, healthBackgroundBitmap.width, healthBackgroundBitmap.height);
    healthBackgroundBitmap.ctx.fillStyle = 'red';
    healthBackgroundBitmap.ctx.fill();

    //create a sprite using the healthBackgroundBitmap data
    var healthBarBG = game.add.sprite(positionX, positionY, healthBackgroundBitmap);
    healthBarBG.fixedToCamera = true;
    meters.add(healthBarBG);

    //healthBackgroundBitmap2
    var healthBackgroundBitmap2 = game.add.bitmapData(widthHP-4, heightHP-4);
    healthBackgroundBitmap2.ctx.beginPath();
    healthBackgroundBitmap2.ctx.rect(0, 0, healthBackgroundBitmap2.width, healthBackgroundBitmap2.height);
    healthBackgroundBitmap2.ctx.fillStyle = '#ca0000';
    healthBackgroundBitmap2.ctx.fill();

    //create sprite using healthBackgroundBitmap2
    healthBarBG2 = game.add.sprite(positionX+2, positionY+2, healthBackgroundBitmap2);
    healthBarBG2.fixedToCamera = true;
    meters.add(healthBarBG2);

    //create the actual health bar
    var healthBarBitmap = game.add.bitmapData(widthHP-4, heightHP-4);
    healthBarBitmap.ctx.beginPath();
    healthBarBitmap.ctx.rect(0, 0, healthBarBitmap.width, healthBarBitmap.height);
    healthBarBitmap.ctx.fillStyle = '#04fd00';
    healthBarBitmap.ctx.fill();

    //create a health bar using healthBarBitmap
    healthBar = game.add.sprite(positionX+2, positionY+2, healthBarBitmap);
    healthBar.fixedToCamera = true;
    meters.add(healthBar);

    //add the overlay
    var hpOverlay = game.add.sprite(positionX-15, positionY+8, 'healthOverlay');
    hpOverlay.anchor.setTo(.5);
    var hpTween = game.add.tween(hpOverlay.scale).to( { x: 1.2, y: 1.2 }, 800, Phaser.Easing.Linear.None, true);
    hpTween.loop(true);
    hpTween.yoyo(true, 0);
    hpOverlay.fixedToCamera = true;

}

function updateHealthBar(widthHP, heightHP) {
    if(widthHP == undefined){widthHP = 192;}
    if(heightHP == undefined){heightHP = 16;}
    widthHP = widthHP - 4;
    widthHP = widthHP - 4;

    var m = (player.maxHP - player.hp)/player.maxHP;
    var bh = widthHP - (widthHP * m);

    healthBar.key.context.clearRect(0, 0, healthBar.width, healthBar.height);
    healthBar.key.context.fillRect(0, 0, bh, healthBar.height);
    healthBar.key.dirty = true;
}

function createAmmoText(player) {
    
    this.ammoText = game.add.text(1050, 30, player.currentWeapon,
        {font: '20px Arial', fill: '#ffffff'});
    
    this.ammoText.fixedToCamera = true;
    return this.ammoText;
}

function updateAmmoText(ammoText, player) {
    if (player.currentWeapon != 'PISTOL') {
        ammoText.text = player.currentWeapon + '   ' + player.ammo;
        if (player.ammo <= 0) ammoText.fill = '#ff0000';
            else ammoText.fill = '#ffffff';
    } else {
        ammoText.text = player.currentWeapon;
        ammoText.fill = '#ffffff';
    }
}

// Enemies' weapon drop function
function dropWeapon(enemy, player) {
    
    var weapons = ['RIFLE', 'SHOTGUN', 'SMG', 'healthPack'];
    var randomNumber = game.rnd.realInRange(0,1);
    var randomWeap = Phaser.ArrayUtils.getRandomItem(weapons);
    var randomSprite;

    // 2/3 Chance of dropping a weapon
    if (randomNumber >= 0.33) {

        if (randomWeap === 'RIFLE') randomSprite = 'rifleSprite';
        else if (randomWeap === 'SHOTGUN') randomSprite = 'shotgunSprite';
        else if (randomWeap === 'SMG') randomSprite = 'smgSprite';
        else {
            new HealthPack(game, enemy.x, enemy.y);
        }
        
        if(randomWeap != 'healthPack') this.weapon = new Weapon(game, enemy.x, enemy.y, randomSprite, randomWeap, player);
    }

    
}

//makes an enemy aggro
function makeAggro(enemy) {
    enemy.docile = false;
}