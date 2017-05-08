//this function returns the angle to ratate thisSprite to, in order to make it face targetSprite
//I based this on phaser's built in method called angleToPointer()
function angleToSprite(thisSprite, targetSprite) {
    var dx = targetSprite.body.x - thisSprite.body.x;
    var dy = targetSprite.body.y - thisSprite.body.y;
    return Math.atan2(dy, dx);
}

//find the distance between two sprites
function distance(sprite1, sprite2) {
    var dx = sprite1.body.x - sprite2.body.x;
    var dy = sprite1.body.y - sprite2.body.y;
    return Math.sqrt(dx*dx + dy*dy);
}

//this function is used to make an enemy charge at the player based on their charegeRate property
//currently only used for FastCharger
function chargeAtPlayer(enemy) {
      if(enemy.distanceToPlayer <= 300 && game.time.now > enemy.nextCharge) {
        enemy.nextCharge = game.time.now + enemy.chargeRate;

        //knockback the enemy towards the direction its facing
        enemy.knockedBack = true;
        knockback(enemy, 800, enemy.rotation - Math.PI);
        enemy.body.drag.x = 1000;
        enemy.body.drag.y = 1000;
      }
}

//this function is used to make an enemy shoot at the player
//requires nextShot and fireRate properties
//currently only used for BasicShooter
function shootPlayer(enemy) {
    if(game.time.now > enemy.nextShot) {
    	enemy.nextShot = game.time.now + enemy.fireRate;

    	//knock back the enemy
    	enemy.knockedBack = true;
    	knockback(enemy, 150, enemy.rotation);
    	enemy.body.drag.x = 1000;
    	enemy.body.drag.y = 1000;
        new EnemyBullet(game, enemy.x, enemy.y, 'atlas', 'bullet0001', 1);
    }
}