//score.js
var inGameScoreText;
var levelStartTime;
var levelTimer;
var min, sec, totalSec;
function createInGameScore() {
	inGameScoreText = game.add.text(750, 20, 'Score: 0', {font: '30px Aldrich', fill: '#ffffff'});
	inGameScoreText.anchor.set(.5);
	inGameScoreText.fixedToCamera = true;

	levelTimer = game.add.text(500, 20, 'Time: 0:00', {font: '30px Aldrich', fill: '#ffffff'});
	levelTimer.anchor.set(.5);
	levelTimer.fixedToCamera = true;


	totalScore = 0;
	accuracy = 0;
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
var Score = function(game) {var button;};
Score.prototype = {
	preload: function() {

	},
	create: function() {
		game.add.image(0, 0, 'scoreBg');
		game.time.events.add(Phaser.Timer.SECOND * 1, displayTitle, this);
		game.time.events.add(Phaser.Timer.SECOND * 2, showEnemiesKilled, this);
		game.time.events.add(Phaser.Timer.SECOND * 3, showDamage, this);
		game.time.events.add(Phaser.Timer.SECOND * 4, showAccuracy, this);
		game.time.events.add(Phaser.Timer.SECOND * 5, showTime, this);

		button = game.add.button(250, 50, 'genericButton', skipScore, this);
		button.anchor.setTo(0.5);
		button.inputEnabled = true;
		button.useHandCursor = false;
		button.visible = false;
		button.scale.setTo(.6,1);
		buttonText = game.add.text(button.x, 50, 'Continue', {font: '18px Aldrich', fill: '#000000'});
		buttonText.anchor.setTo(0.5);
	},
	update: function() {

	}
};

function displayTitle() {
	var title = game.add.text(620, 50, 'Your Results', {font: '70px Aldrich', fill: '#ffffff'});
	title.anchor.set(0.5);
	var underline = game.add.graphics(title.left, title.bottom - 7);
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 300, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
	button.visible = true;
}

function showEnemiesKilled() {
	var killed = enemiesKilled / 1000;
	var title = game.add.text(40, 200, 'Aliens Apprehended: ' + killed, {font: '45px Aldrich', fill: '#ffffff'});
	title.anchor.set(0, 0.5);
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 300, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
}

function showDamage() {
	var damageDealt = Math.trunc(damage/100);
	var title = game.add.text(40, 300, 'Damage Dealt: ' + damageDealt, {font: '45px Aldrich', fill: '#ffffff'});
	title.anchor.set(0, 0.5);
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 300, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
}

function showAccuracy() {
	accuracy = bulletsHit / bulletsShot;
	accuracy = Math.trunc(accuracy * 100);
	var title = game.add.text(40, 400, 'Bullet Accuracy: ' + accuracy + '%', {font: '45px Aldrich', fill: '#ffffff'});
	title.anchor.set(0, 0.5);
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 300, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
}

function showTime() {
	if(sec > 9) var title = game.add.text(40, 500, 'Time: ' + min + ':' + sec, {font: '45px Aldrich', fill: '#ffffff'});
	else var title = game.add.text(40, 500, 'Time: ' + min + ':0' + sec, {font: '45px Aldrich', fill: '#ffffff'});
	title.anchor.set(0, 0.5);;
	var tween = game.add.tween(title.scale).to( { x: 1.3, y: 1.3 }, 300, Phaser.Easing.Linear.None, true);
	tween.yoyo(true, 0);
}

function skipScore() {
	game.state.start('Upgrade');
}