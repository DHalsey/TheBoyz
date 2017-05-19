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
			var healthButton = game.add.button(500, 200, 'genericButton', upgradeHealth, this);
			healthButton.inputEnabled = true;
			healthButton.useHandCursor = false;
			game.add.text(510, 225, '+ Max HP', {fontSize: '12px', fill: '#000000'});
		}

		//upgrade pistol
		if(!pistolUpgraded) {
			var pistolButton = game.add.button(500, 300, 'genericButton', upgradePistol, this);
			pistolButton.inputEnabled = true;
			pistolButton.useHandCursor = false;
			game.add.text(510, 325, 'Pistol 2 Round Burst', {fontSize: '12px', fill: '#000000'});
		}

		//upgrade rifle
		if(!rifleUpgraded) {
			var rifleButton = game.add.button(500, 400, 'genericButton', upgradeRifle, this);
			rifleButton.inputEnabled = true;
			rifleButton.useHandCursor = false;
			game.add.text(510, 425, '+ Rifle Fire Rate', {fontSize: '12px', fill: '#000000'});
		}

		//upgrade shotgun
		if(!shotgunUpgraded) {
			var shotgunButton = game.add.button(500, 500, 'genericButton', upgradeShotgun, this);
			shotgunButton.inputEnabled = true;
			shotgunButton.useHandCursor = false;
			game.add.text(510, 525, '+ Shotgun Damage', {fontSize: '12px', fill: '#000000'});
		}

		//enable dash ability
		if(!dashEnabled) {
			var dashButton = game.add.button(500, 600, 'genericButton', enableDash, this);
			dashButton.inputEnabled = true;
			dashButton.useHandCursor = false;
			game.add.text(510, 625, 'Acquire Dash Ability', {fontSize: '12px', fill: '#000000'});
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