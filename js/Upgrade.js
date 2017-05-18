//Upgrade.js
var Upgrade = function(game) {};
Upgrade.prototype = {
	preload: function() {

	},
	create: function() {
		//load background and title
		game.add.image(0, 0, 'loadBackground');
		game.add.text(500 - 50, 80, 'Choose an Upgrade', {fontSize: '32px', fill: "#000000"});

		//upgrade health
		if(!healthUpgraded) {
			var healthButton = game.add.button(500, 200, 'button', upgradeHealth, this);
			healthButton.inputEnabled = true;
			healthButton.useHandCursor = false;
		}

		//upgrade pistol
		if(!pistolUpgraded) {
			var pistolButton = game.add.button(500, 300, 'button', upgradePistol, this);
			pistolButton.inputEnabled = true;
			pistolButton.useHandCursor = false;
		}

		//upgrade rifle
		if(!rifleUpgraded) {
			var rifleButton = game.add.button(500, 400, 'button', upgradeRifle, this);
			rifleButton.inputEnabled = true;
			rifleButton.useHandCursor = false;
		}

		//upgrade shotgun
		if(!shotgunUpgraded) {
			var shotgunButton = game.add.button(500, 500, 'button', upgradeShotgun, this);
			shotgunButton.inputEnabled = true;
			shotgunButton.useHandCursor = false;
		}

		//enable dash ability
		if(!dashEnabled) {
			var dashButton = game.add.button(500, 600, 'button', enableDash, this);
			dashButton.inputEnabled = true;
			dashButton.useHandCursor = false;
		}
	},
	update: function() {

	}
};

function upgradeHealth() {
	statChanger.changeHealth();
	healthUpgraded = true;
	game.state.start(nextLevel);
}

function upgradePistol() {
	statChanger.changePistol();
	pistolUpgraded = true;
	game.state.start(nextLevel);
}

function upgradeRifle() {
	statChanger.changeRifle();
	rifleUpgraded = true;
	game.state.start(nextLevel);
}

function upgradeShotgun() {
	statChanger.changeShotgun();
	shotgunUpgraded = true;
	game.state.start(nextLevel);
}


function enableDash() {
	statChanger.changeDash();
	dashEnabled = true;
	game.state.start(nextLevel);
}