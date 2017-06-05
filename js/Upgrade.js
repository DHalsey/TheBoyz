//create upgrades array
var possibleUpgrades = new Array('dash', 'pistol', 'rifle', 'shotgun', 'smg', 'hp','skip');
var possibleY = new Array(175, 250, 325, 400, 475, 550, 625);
var dashCost = 0;
var hpCost = 100;
var pistolCost = 175;
var rifleCost = 100;
var shotgunCost = 100;
var smgCost = 100;
var notEnough;

//Upgrade.js
var Upgrade = function(game) {var buttonString, button, buttonFunction;};
Upgrade.prototype = {
	preload: function() {

	},
	create: function() {
		createLayout();

		reticle = game.add.sprite(game.input.activePointer.x - 8, game.input.activePointer.y - 8, 'reticle');
      	reticle.anchor.setTo(0.5);
      	updateProgress();
	},
	update: function() {
	   reticle.x = game.input.activePointer.x + game.camera.x;
       reticle.y = game.input.activePointer.y + game.camera.y;
	}
};

function createLayout() {
	//load background and title
		game.add.image(0, 0, 'loadBackground');
		var upgradeText = game.add.text(room_width/4, 80, 'Upgrade', {font: '32px Aldrich', fill: "#000000"});
		upgradeText.anchor.set(.5);
		var costText = game.add.text(room_width/2, 80, 'Cost', {font: '32px Aldrich', fill: "#000000"});
		costText.anchor.set(.5);
		var cardText = game.add.text(room_width/1.5, 80, 'Greencards: ' + greencards, {font: '32px Aldrich', fill: "#000000"});
		cardText.anchor.set(.5);
		var cost;
		var upgradeCost;
		notEnough = game.add.text(room_width/1.5, 200, 'Not Enough Cards!', {font: '28px Aldrich', fill: '#000000'});
		notEnough.anchor.set(.5);
		notEnough.visible = false;

		//Hide mouse cursor
    	document.body.style.cursor = 'none';


		for(var i=0; i<possibleUpgrades.length; i++) {

			if(possibleUpgrades[i] === 'hp') {
				buttonString = '+ Max HP';
				buttonFunction = upgradeHealth;
				upgradeCost = hpCost;
			} else if(possibleUpgrades[i] === 'pistol') {
				buttonString = 'Pistol 2 Round Burst';
				buttonFunction = upgradePistol;
				upgradeCost = pistolCost;
			} else if(possibleUpgrades[i] === 'rifle') {
				buttonString = '+ Rifle Fire Rate';
				buttonFunction = upgradeRifle;
				upgradeCost = rifleCost;
			} else if(possibleUpgrades[i] === 'shotgun') {
				buttonString = '+ Shotgun Damage';
				buttonFunction = upgradeShotgun;
				upgradeCost = shotgunCost;
			} else if(possibleUpgrades[i] === 'smg') {
				buttonString = '+ SMG Ammo Cap';
				buttonFunction = upgradeSMG;
				upgradeCost = smgCost;
			} else if(possibleUpgrades[i] === 'dash') {
				buttonString = 'Dash Ability';
				buttonFunction = enableDash;
				upgradeCost = 'FREE';
			}
			else {
				buttonString = 'Continue';
				buttonFunction = skipUpgrade;
				upgradeCost = '';
			}

			button = game.add.button(room_width/4, possibleY[i], 'genericButton', buttonFunction, this, 2, 0, 1);
			button.anchor.setTo(0.5);
			button.inputEnabled = true;
			button.input.useHandCursor = false;
			buttonText = game.add.text(button.x, possibleY[i], buttonString, {font: '18px Aldrich', fill: '#000000'});
			buttonText.anchor.setTo(0.5);

			cost = game.add.text(room_width/2, possibleY[i], '' + upgradeCost, {font: '30px Aldrich', fill: '#000000'});
			cost.anchor.set(.5);
			reticle = game.add.sprite(game.input.activePointer.x - 8, game.input.activePointer.y - 8, 'reticle');
      	    reticle.anchor.setTo(0.5);
		}
}

function upgradeHealth() {
	if(greencards < hpCost) {
		notEnoughCards();
	} else {
		statChanger.changeHealth();
		greencards -= hpCost;
		updateCardText();
		var index = possibleUpgrades.indexOf('hp');
		if(index > -1) possibleUpgrades.splice(index, 1);
		chooseUpgradeAud.play();
		createLayout();
	}
}

function upgradePistol() {
	if(greencards < pistolCost) {
		notEnoughCards();
	} else {
		statChanger.changePistol();
		greencards -= pistolCost;
		updateCardText();
		var index = possibleUpgrades.indexOf('pistol');
		if(index > -1) possibleUpgrades.splice(index, 1);
		chooseUpgradeAud.play();
		createLayout();
	}
}

function upgradeRifle() {
	if(greencards < rifleCost) {
		notEnoughCards();
	} else {
		statChanger.changeRifle();
		greencards -= rifleCost;
		updateCardText();
		var index = possibleUpgrades.indexOf('rifle');
		if(index > -1) possibleUpgrades.splice(index, 1);
		chooseUpgradeAud.play();
		createLayout();
	}
}

function upgradeShotgun() {
	if(greencards < shotgunCost) {
		notEnoughCards();
	} else {
		statChanger.changeShotgun();
		greencards -= shotgunCost;
		updateCardText();
		var index = possibleUpgrades.indexOf('shotgun');
		if(index > -1) possibleUpgrades.splice(index, 1);
		chooseUpgradeAud.play();
		createLayout();
	}
}

function upgradeSMG() {
	if(greencards < smgCost) {
		notEnoughCards();
	} else {
		statChanger.changeSMG();
		greencards -= smgCost;
		updateCardText();
		var index = possibleUpgrades.indexOf('smg');
		if(index > -1) possibleUpgrades.splice(index, 1);
		chooseUpgradeAud.play();
		createLayout();
	}
}


function enableDash() {
	statChanger.changeDash();
	updateCardText();
	var index = possibleUpgrades.indexOf('dash');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	createLayout();
}

function skipUpgrade() {
	roomSwitchAud.play();
	game.time.events.add(Phaser.Timer.SECOND * .5, startNextLevel, this);
}

function startNextLevel() {
	game.state.start(nextLevel);
}

function updateProgress() {
	var progressBg = game.add.image(room_width/2, 730, 'progressBg');
	var progressBar = game.add.image(room_width/2, 730, 'progressFg');
	var text = game.add.text(room_width/2, 697, 'Game Progress', {font: '18px Aldrich', fill: '#000000'});
	text.anchor.set(.5);
	progressBg.anchor.set(.5);
	progressBar.anchor.set(.5);
	progressBar.scale.setTo(0,1);
	var tween;
	if(currentLevel == 'Play') tween = game.add.tween(progressBar.scale).to( { x: (1/4) }, 1000, Phaser.Easing.Linear.None, true);
	if(currentLevel == 'Level2') tween = game.add.tween(progressBar.scale).to( { x: (1/2) }, 1000, Phaser.Easing.Linear.None, true);
	if(currentLevel == 'Level3') tween = game.add.tween(progressBar.scale).to( { x: (3/4) }, 1000, Phaser.Easing.Linear.None, true);
	if(currentLevel == 'Level4') tween = tween = game.add.tween(progressBar.scale).to( { x: (1) }, 1000, Phaser.Easing.Linear.None, true);
}

function notEnoughCards() {
	notEnough.visible = true;
	game.time.events.add(Phaser.Timer.SECOND * 3, upgradeMakeInvis, this);
}

function upgradeMakeInvis() {
	notEnough.visible = false;
}

function updateCardText() {
	cardText.text = 'Greencards: ' + greencards;
}