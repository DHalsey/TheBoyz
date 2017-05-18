//PlayerStatChanger.js
function PlayerStatChanger() {
	this.hp = 10;
	this.maxHP = 15;
	this.shotgunPellets = 10;
	this.rifleROF = 100;
	this.canDash = false;
	this.pistolUpgraded = false;
}

PlayerStatChanger.prototype.changeHealth = function() {
	this.hp = 15;
	this.maxHP = 15;
}

PlayerStatChanger.prototype.changeShotgun = function() {
	this.shotgunPellets = 13;
}

PlayerStatChanger.prototype.changeRifle = function() {
	this.rifleROF = 75;
}

PlayerStatChanger.prototype.changeDash = function() {
	this.canDash = true;
}

PlayerStatChanger.prototype.changePistol = function() {
	this.pistolUpgraded = true;
}