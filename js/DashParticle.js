//DashParticle prefab
function DashParticle(game, player) {
	var rand = game.rnd.integerInRange(1,10);
	var sprite = '';

	if(rand == 1) sprite = 'dashParticle';
	else if(rand == 2) sprite = 'missileParticle4';
	else sprite = 'dashParticle2';

	Phaser.Sprite.call(this, game, player.x, player.y, sprite);

	//add to the game
	game.add.existing(this);

	//enable physics and set some properties
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

	if(!player.movingUp && !player.movingDown && !player.movingRight && !player.movingLeft)
        this.rotation = player.rotation - Math.PI;

    //dash up
    else if(player.movingUp && !player.movingDown && !player.movingLeft && !player.movingRight)
        this.rotation = Math.PI/2;  

    //dash down
    else if(!player.movingUp && player.movingDown && !player.movingLeft && !player.movingRight)
        this.rotation = (3*Math.PI)/2;

    //dash left
    else if(!player.movingUp && !player.movingDown && player.movingLeft && !player.movingRight)
        this.rotation = 0;

    //dash right
    else if(!player.movingUp && !player.movingDown && !player.movingLeft && player.movingRight)
        this.rotation = Math.PI;

    //dash up and right
    else if(player.movingUp && !player.movingDown && !player.movingLeft && player.movingRight)
        this.rotation = (3*Math.PI)/4;

    //dash up left
    else if(player.movingUp && !player.movingDown && player.movingLeft && !player.movingRight)
        thisrotation = (Math.PI)/4;

    //dash down left
    else if(!player.movingUp && player.movingDown && player.movingLeft && !player.movingRight)
        this.rotation = (7*Math.PI)/4;

    else //dash down right
        this.rotation = (5*Math.PI)/4;

	//set additional properties
	this.rotation += game.rnd.realInRange(-(Math.PI/3), (Math.PI/3));
	this.timeCreated = game.time.now;

	game.physics.arcade.velocityFromRotation(this.rotation, game.rnd.integerInRange(200,300), this.body.velocity);	

	//set random scale
	rand = game.rnd.realInRange(0.5, 1.6);
	this.scale.setTo(rand);

	//set random apha
	this.alpha = game.rnd.realInRange(.4,.65);
}

DashParticle.prototype = Object.create(Phaser.Sprite.prototype);
DashParticle.prototype.constructor = DashParticle;

DashParticle.prototype.update = function() {
	if(game.time.now > this.timeCreated + 300) {
		this.destroy();
	}
}