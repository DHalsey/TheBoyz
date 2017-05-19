//DashTimer.js

var dashText;
function createDashText(player) {
	if(player.canDash) {
		dashText = game.add.text(850, 30, 'Dash:  READY!',{font: '20px Arial', fill: '#ffffff'});
		player.dashTextCreated = true;
		dashText.fixedToCamera = true;
	}
}

function startDashCooldown() {
	dashText.text = 'Dash:  2s';
	game.time.events.add(Phaser.Timer.SECOND * 1, changeToOne, this);
}

function changeToOne() {
	dashText.text = 'Dash:  1s';
	dashTimer1Aud.play();
	game.time.events.add(Phaser.Timer.SECOND * 1, changeToReady, this);
}

function changeToReady() {
	dashText.text = 'Dash:  READY!';
	dashTimer2Aud.play();
}