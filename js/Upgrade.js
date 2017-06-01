//create upgrades array
var possibleUpgrades = new Array('hp', 'pistol', 'rifle', 'shotgun', 'smg', 'dash','skip');
var possibleY = new Array(175, 250, 325, 400, 475, 550, 625);


//Upgrade.js
var Upgrade = function(game) {var buttonString, button, buttonFunction;};
Upgrade.prototype = {
	preload: function() {

	},
	create: function() {
		//load background and title
		game.add.image(0, 0, 'loadBackground');
		upgradeText = game.add.text(500 - 50, 80, 'Choose an Upgrade', {font: '32px Aldrich', fill: "#000000"});

		playMusic.stop();

		for(var i=0; i<possibleUpgrades.length; i++) {

			if(possibleUpgrades[i] === 'hp') {
				buttonString = '+ Max HP';
				buttonFunction = upgradeHealth;
			} else if(possibleUpgrades[i] === 'pistol') {
				buttonString = 'Pistol 2 Round Burst';
				buttonFunction = upgradePistol;
			} else if(possibleUpgrades[i] === 'rifle') {
				buttonString = '+ Rifle Fire Rate';
				buttonFunction = upgradeRifle;
			} else if(possibleUpgrades[i] === 'shotgun') {
				buttonString = '+ Shotgun Damage';
				buttonFunction = upgradeShotgun;
			} else if(possibleUpgrades[i] === 'smg') {
				buttonString = '+ SMG Ammo Cap';
				buttonFunction = upgradeSMG;
			} else if(possibleUpgrades[i] === 'dash') {
				buttonString = 'Dash Ability';
				buttonFunction = enableDash;
			}
			else {
				buttonString = 'No Upgrade';
				buttonFunction = skipUpgrade;
			}

			button = game.add.button(600, possibleY[i], 'genericButton', buttonFunction, this);
			button.anchor.setTo(0.5);
			button.inputEnabled = true;
			button.useHandCursor = false;
			buttonText = game.add.text(button.x, possibleY[i], buttonString, {font: '18px Aldrich', fill: '#000000'});
			buttonText.anchor.setTo(0.5);

		}

		reticle = game.add.sprite(game.input.activePointer.x - 8, game.input.activePointer.y - 8, 'reticle');
      	reticle.anchor.setTo(0.5);
	},
	update: function() {
	   reticle.x = game.input.activePointer.x + game.camera.x;
       reticle.y = game.input.activePointer.y + game.camera.y;
	}
};

function upgradeHealth() {
	statChanger.changeHealth();
	var index = possibleUpgrades.indexOf('hp');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.camera.fade('#000000');
	game.time.events.add(Phaser.Timer.SECOND * .5, startNextLevel, this);
}

function upgradePistol() {
	statChanger.changePistol();
	var index = possibleUpgrades.indexOf('pistol');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.camera.fade('#000000');
	game.time.events.add(Phaser.Timer.SECOND * .5, startNextLevel, this);
}

function upgradeRifle() {
	statChanger.changeRifle();
	var index = possibleUpgrades.indexOf('rifle');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.camera.fade('#000000');
	game.time.events.add(Phaser.Timer.SECOND * .5, startNextLevel, this);
}

function upgradeShotgun() {
	statChanger.changeShotgun();
	var index = possibleUpgrades.indexOf('shotgun');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.camera.fade('#000000');
	game.time.events.add(Phaser.Timer.SECOND * .5, startNextLevel, this);
}

function upgradeSMG() {
	statChanger.changeSMG();
	var index = possibleUpgrades.indexOf('smg');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.camera.fade('#000000');
	game.time.events.add(Phaser.Timer.SECOND * .5, startNextLevel, this);
}


function enableDash() {
	statChanger.changeDash();
	var index = possibleUpgrades.indexOf('dash');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.camera.fade('#000000');
	game.time.events.add(Phaser.Timer.SECOND * .5, startNextLevel, this);
}

function skipUpgrade() {
	roomSwitchAud.play();
	game.time.events.add(Phaser.Timer.SECOND * .5, startNextLevel, this);
}

function startNextLevel() {
	reticle.destroy();
	game.state.start(nextLevel);
}