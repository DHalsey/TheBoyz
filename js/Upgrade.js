//create upgrades array
var possibleUpgrades = new Array('hp', 'pistol', 'rifle', 'shotgun', 'dash', 'skip');
var possibleY = new Array(175, 250, 325, 400, 475, 550);


//Upgrade.js
var Upgrade = function(game) {var buttonString, button, buttonFunction;};
Upgrade.prototype = {
	preload: function() {

	},
	create: function() {
		//load background and title
		game.add.image(0, 0, 'loadBackground');
		game.add.text(500 - 50, 80, 'Choose an Upgrade', {fontSize: '32px', fill: "#000000"});

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
			} else if(possibleUpgrades[i] === 'dash') {
				buttonString = 'Dash Ability';
				buttonFunction = enableDash;
			}
			else {
				buttonString = 'No Upgrade';
				buttonFunction = skipUpgrade;
			}

			button = game.add.button(500, possibleY[i], 'genericButton', buttonFunction, this);
			button.inputEnabled = true;
			button.useHandCursor = false;
			game.add.text(510, possibleY[i] + 25, buttonString, {fontSize: '12px', fill: '#000000'});
		}
	},
	update: function() {

	}
};

function upgradeHealth() {
	statChanger.changeHealth();
	var index = possibleUpgrades.indexOf('hp');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.state.start(nextLevel);
}

function upgradePistol() {
	statChanger.changePistol();
	var index = possibleUpgrades.indexOf('pistol');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.state.start(nextLevel);
}

function upgradeRifle() {
	statChanger.changeRifle();
	var index = possibleUpgrades.indexOf('rifle');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.state.start(nextLevel);
}

function upgradeShotgun() {
	statChanger.changeShotgun();
	var index = possibleUpgrades.indexOf('shotgun');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.state.start(nextLevel);
}


function enableDash() {
	statChanger.changeDash();
	var index = possibleUpgrades.indexOf('dash');
	if(index > -1) possibleUpgrades.splice(index, 1);
	chooseUpgradeAud.play();
	game.state.start(nextLevel);
}

function skipUpgrade() {
	roomSwitchAud.play();
	game.state.start(nextLevel);
}