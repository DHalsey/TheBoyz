//score.js
var inGameScoreText;
var levelStartTime;
var levelTimer;
var min, sec, totalSec;
var finalShown;
var finalShownTime;
var finalTextSlid;
var shaken = false;
function createInGameScore() {

	var scoreboard = game.add.image(620, 0, 'scoreboard');
	scoreboard.fixedToCamera = true;
	scoreboard.anchor.set(.5);
	scoreboard.scale.setTo(1.3, 1.7);

	inGameScoreText = game.add.text(750, 20, 'Score: 0', {font: '30px Aldrich', fill: '#ffffff'});
	inGameScoreText.anchor.set(.5);
	inGameScoreText.fixedToCamera = true;

	levelTimer = game.add.text(500, 20, 'Time: 0:00', {font: '30px Aldrich', fill: '#ffffff'});
	levelTimer.anchor.set(.5);
	levelTimer.fixedToCamera = true;


	totalScore = 0;
	accuracy = 0;
	accuracyBonus = 0;
	damage = 0;
	timeBonus = 0;
	inGameScore = 0;
	enemiesKilled = 0;
	bulletsHit = 0;
	bulletsShot = 0;
	levelTime = 0;
	min = 0;
	sec = 0;
	totalSec = 0
	levelStartTime = game.time.now;
}

function updateInGameScore() {
	levelTime = game.time.now - levelStartTime;
	totalSec = Math.trunc(levelTime / 1000);
	min = Math.trunc((totalSec % 3600) / 60);
	sec = Math.trunc((totalSec % 3600) % 60);

	if(sec > 9) levelTimer.text = 'Time: ' + min + ':' + sec;
	else levelTimer.text = 'Time: ' + min + ':0' + sec;

	inGameScore = damage + enemiesKilled;
	inGameScoreText.text = 'Score: ' + inGameScore;
}

//create upgrades array
var possibleUpgrades = new Array('hp', 'pistol', 'rifle', 'shotgun', 'smg', 'dash','skip');
var possibleY = new Array(175, 250, 325, 400, 475, 550, 625);


//Score.js
var Score = function(game) {var button, finalScoreText, scoreCounter;};
Score.prototype = {
	preload: function() {

	},
	create: function() {
		game.add.image(0, 0, 'scoreBg');

		//first wave of stats
		game.time.events.add(Phaser.Timer.SECOND * 1, displayTitle, this);
		game.time.events.add(Phaser.Timer.SECOND * 2, showEnemiesKilled, this);
		game.time.events.add(Phaser.Timer.SECOND * 3, showDamage, this);
		game.time.events.add(Phaser.Timer.SECOND * 4, showAccuracy, this);
		game.time.events.add(Phaser.Timer.SECOND * 5, showTime, this);

		//second wave of stats
		game.time.events.add(Phaser.Timer.SECOND * 8, showInGameScore, this);
		game.time.events.add(Phaser.Timer.SECOND * 9, showAccuracyBonus, this);
		game.time.events.add(Phaser.Timer.SECOND * 10, showTimeBonus, this);

		//continue button
		button = game.add.button(250, 50, 'genericButton', skipScore, this, 2, 0, 1);
		button.anchor.setTo(0.5);
		button.inputEnabled = true;
		button.input.useHandCursor = false;
		button.visible = false;
		button.scale.setTo(.6,1);
		buttonText = game.add.text(button.x, 50, 'Continue', {font: '18px Aldrich', fill: '#000000'});
		buttonText.anchor.setTo(0.5);

		//final score
		finalScoreText = game.add.text(-600, 550, 'Final Score: 0', {font: '80px Aldrich', fill: '#ffffff'});
		finalScoreText.anchor.set(0, .5);
		game.time.events.add(Phaser.Timer.SECOND * 11, showFinalScore, this);
		finalShown = false;
		scoreCounter = 0;

		//make reticle
		reticle = game.add.sprite(game.input.activePointer.x - 8, game.input.activePointer.y - 8, 'scoreReticle');
        reticle.anchor.setTo(0.5);
        reticle.scale.setTo(.5);

        tweenedFinalScore = false;
        finalTextSlid = false;
        shaken = false;

        game.camera.follow(new RoomAnchor(game, room_width/2, room_height/2));

        playMusic.stop();
	},
	update: function() {
		//update reticle position
		reticle.x = game.input.activePointer.x + game.camera.x;
        reticle.y = game.input.activePointer.y + game.camera.y;

        //show the final score text and increase the number every frame
        //when finished, shake the screen and do a camera flash
		if(finalShown) {
			slideFinalText(finalScoreText);
			if(game.time.now > finalShownTime + 1000) {
				if(scoreCounter < totalScore) {
				if(currentLevel === 'Play') scoreCounter += 100;
				else scoreCounter += 1000;

				if(scoreCounter > totalScore) scoreCounter = totalScore

				finalScoreText.text = 'Final Score: ' + scoreCounter;
				}
				if(scoreCounter == totalScore) {
					shake();
				}
			}	
		}
	}
};

function displayTitle() {
	var title = game.add.text(room_width/2, 50, 'Scoreboard', {font: '70px Aldrich', fill: '#ffffff'});
	title.anchor.set(0.5);
	var underline = game.add.graphics(title.left, title.bottom - 7);
	var tween = game.add.tween(title).to( { x: 900}, 200, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
	button.visible = true;

	var tween2 = game.add.tween(button).to( { x: button.x + 300}, 200, Phaser.Easing.Linear.None, true);
	tween2.yoyo(true, 0);

	var tween3 = game.add.tween(buttonText).to( { x: button.x + 300}, 200, Phaser.Easing.Linear.None, true);
	tween3.yoyo(true, 0);
}

function showEnemiesKilled() {
	var killed = enemiesKilled / 1000;
	var title = game.add.text(40, 200, 'Aliens Apprehended: ' + killed, {font: '45px Aldrich', fill: '#ffffff'});
	title.anchor.set(0, 0.5);
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 200, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
	game.time.events.add(Phaser.Timer.SECOND * 5, slideText, this, title);
}

function showDamage() {
	var damageDealt = Math.trunc(damage/100);
	var title = game.add.text(40, 300, 'Damage Dealt: ' + damageDealt, {font: '45px Aldrich', fill: '#ffffff'});
	title.anchor.set(0, 0.5);
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 200, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
	game.time.events.add(Phaser.Timer.SECOND * 4.1, slideText, this, title);

}

function showAccuracy() {
	accuracy = bulletsHit / bulletsShot;
	accuracy = Math.trunc(accuracy * 100);
	var title = game.add.text(40, 400, 'Bullet Accuracy: ' + accuracy + '%', {font: '45px Aldrich', fill: '#ffffff'});
	title.anchor.set(0, 0.5);
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 200, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
	game.time.events.add(Phaser.Timer.SECOND * 3.2, slideText, this, title);

}

function showTime() {
	if(sec > 9) var title = game.add.text(40, 500, 'Time: ' + min + ':' + sec, {font: '45px Aldrich', fill: '#ffffff'});
	else var title = game.add.text(40, 500, 'Time: ' + min + ':0' + sec, {font: '45px Aldrich', fill: '#ffffff'});
	title.anchor.set(0, 0.5);;
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 200, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
	game.time.events.add(Phaser.Timer.SECOND * 2.3, slideText, this, title);
}

function showInGameScore() {
	var title = game.add.text(room_width/2, 200, 'Level Score: ' + inGameScore, {font: '55px Aldrich', fill: '#ffffff'});
	title.anchor.set(0.5);;
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 200, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
}

function showAccuracyBonus() {
	if(currentLevel != 'Play') accuracyBonus = accuracy * 500;
	else accuracyBonus = accuracy * 100;
	var title = game.add.text(room_width/2, 300, 'Accuracy Bonus: ' + accuracyBonus, {font: '55px Aldrich', fill: '#ffffff'});
	title.anchor.set(0.5);;
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 200, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
}

function showTimeBonus() {
	if(currentLevel === 'Play') {
		if(totalSec <= 30) timeBonus = 4000;
		else if(totalSec <= 60) timeBonus = 2500;
		else if(totalSec <= 90) timeBonus = 1000;
		else if(totalSec <= 120) timeBonus = 500;
		else timeBonus = 0;
	} else if(currentLevel === 'Level2' || currentLevel === 'Level3') {
		if(totalSec <= 60) timeBonus = 100000;
		else if(totalSec <= 120 ) timeBonus = 75000;
		else if(totalSec <= 150) timeBonus = 60000;
		else if(totalSec <= 180) timeBonus = 50000;
		else if(totalSec <= 210) timeBonus = 35000;
		else if(totalSec <= 240) timeBonus = 20000;
		else if(totalSec <= 270) timeBonus = 12000;
		else if(totalSec <= 300) timeBonus = 8000;
		else if(totalSec <= 330) timeBonus = 5000;
		else timeBonus = 0;
	} else {
		if(totalSec <= 90) timeBonus = 100000;
		else if(totalSec <= 150 ) timeBonus = 75000;
		else if(totalSec <= 180) timeBonus = 60000;
		else if(totalSec <= 210) timeBonus = 50000;
		else if(totalSec <= 240) timeBonus = 35000;
		else if(totalSec <= 270) timeBonus = 20000;
		else if(totalSec <= 300) timeBonus = 12000;
		else if(totalSec <= 330) timeBonus = 8000;
		else if(totalSec <= 360) timeBonus = 5000;
		else timeBonus = 0;
	}
	var title = game.add.text(room_width/2, 400, 'Speed Bonus: ' + timeBonus, {font: '55px Aldrich', fill: '#ffffff'});
	title.anchor.set(0.5);;
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 200, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
}

function showFinalScore() {
	finalShown = true;
	finalShownTime = game.time.now;
	totalScore = inGameScore + accuracyBonus + timeBonus;
}

function slideText(body) {
	var tween = game.add.tween(body).to( { x: 2000 }, 300, Phaser.Easing.Linear.None, true);
}

function skipScore() {
	game.state.start('Upgrade');
}

function slideFinalText(body) {
	if(!finalTextSlid) {
		finalTextSlid = true;
		var tween = game.add.tween(body).to( { x: 250 }, 200, Phaser.Easing.Linear.None, true);
	}
}

function shake() {
	if(!shaken) {
		game.camera.flash(0xffffff, 1500);
		game.camera.shake(0.01, 300);
		shaken = true;
	}
}
