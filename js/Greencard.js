//Greencard.js
function Greencard(game, enemy) {
	
	Phaser.Sprite.call(this, game, enemy.x, enemy.y, 'greencard');
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

	this.body.velocity.x = game.rnd.integerInRange(-300, 300);
	this.body.velocity.y = game.rnd.integerInRange(-300, 300);

	this.direction = 1;
	this.movingToPlayer = false;
	this.movementSpeed = 200;

	game.time.events.add(Phaser.Timer.SECOND * 4, cardFade, this, this);
	game.time.events.add(Phaser.Timer.SECOND * .5, stopCard, this, this);
}

Greencard.prototype = Object.create(Phaser.Sprite.prototype);
Greencard.prototype.constructor = Greencard;

Greencard.prototype.update = function() {
	if(!this.movingToPlayer) {
		//Utilizes anchor points to make an object bob up and down
		//The object will bob slower near its min and max heights
		if(this.anchor.y>=0.5){
			this.anchor.y+=(0.75-this.anchor.y)/30*this.direction;
		} else if (this.anchor.y<0.5){
			this.anchor.y+=(this.anchor.y-0.25)/30*this.direction;
		}
		if(this.anchor.y>=0.7) this.direction = -1; //reverses direction
		if(this.anchor.y<=0.3) this.direction = 1; //reverses direct
	}



	if(distance(this, player) <= 300) {
		this.movingToPlayer = true;
		this.movementSpeed += 20;
		game.physics.arcade.moveToObject(this, player, this.movementSpeed);
	}
	game.physics.arcade.overlap(this, player, greenCardCollision, null, this);
}

//Greencard particles
function GreencardParticle(game, greencard) {
	var rand = game.rnd.integerInRange(1,3);
	var sprite;

	if(rand == 1) sprite = 'greencardParticle1';
	else if(rand == 2) sprite = 'greencardParticle2';
	else sprite = 'greencardParticle3';

	Phaser.Sprite.call(this, game, player.x, player.y, sprite);
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);

	this.body.velocity.x = game.rnd.integerInRange(-300,300);
	this.body.velocity.y = game.rnd.integerInRange(-300,300);
	this.body.drag.x = 1000;
	this.body.drag.y = 1000;
	this.timeCreated = game.time.now;

	game.time.events.add(Phaser.Timer.SECOND * 4, cardFade, this, this);
}

GreencardParticle.prototype = Object.create(Phaser.Sprite.prototype);
GreencardParticle.prototype.constructor = GreencardParticle;

GreencardParticle.prototype.update = function() {
	if(game.time.now > this.timeCreated + 500) {
		this.destroy();
	}
}

function cardFade(greencard) {
	var tween = game.add.tween(greencard).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
	game.time.events.add(Phaser.Timer.SECOND * .5, destroyGreencard, this, this);
}

function stopCard(greencard) {
	if(greencard.body != null) {
		greencard.body.velocity.x = 0;
	    greencard.body.velocity.y = 0;
	}
}

function destroyGreencard(greencard) {
	greencard.destroy();
}

function greenCardCollision(greencard, player) {
	explodeGreencard(greencard);
	greencard.destroy();
	greencards++;
}

function explodeGreencard(greencard) {
	for(var i=0; i<30; i++) {
		new GreencardParticle(game, greencard);
	}
}

function createGreencards(enemy) {
	var rand = game.rnd.integerInRange(1, 3);
	for(var i=0; i<rand; i++) {
		new Greencard(game, enemy);
	}
}

var cardText;
function displayGreencards() {
	var display = game.add.image(55, 105, 'greencardDisplay');
	var card = game.add.image(display.x, display.y-15, 'greencard');
	display.anchor.set(.5);
	display.scale.set(2);
	card.anchor.set(.5);
	display.fixedToCamera = true;
	card.fixedToCamera = true;
	cardText = game.add.text(display.x, display.y+19, '0',
        {font: '18px Aldrich', fill: '#ffffff'});
	cardText.anchor.set(.5);
	cardText.fixedToCamera = true;
}

function updateGreencards() {
	cardText.text = '' + greencards;
}