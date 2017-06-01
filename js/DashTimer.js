//DashTimer.js

var dashText;
var dashBar;
var dashBarFull;
function createDashText(player) {
	if(player.canDash) {
		//dashText = game.add.text(850, 30, 'Dash:  READY!',{font: '20px Arial', fill: '#ffffff'});
		player.dashTextCreated = true;
		//dashText.fixedToCamera = true;

		dashBar = game.add.image(64,48,'DashMeter');
		dashBarFull = game.add.image(64,48,'DashMeterFull');
		dashBar.fixedToCamera = true;
		dashBarFull.fixedToCamera = true;
	}
}

function startDashCooldown() {
	//dashText.text = 'Dash:  2s';
	let tween1= game.add.tween(dashBarFull).to( {alpha:0},1,"Linear",true);
	let tween = game.add.tween(dashBar).to( {width: 0},50, Phaser.Easing.Linear.None, true);
	game.time.events.add(Phaser.Timer.SECOND * 1, changeToOne, this);
}

function changeToOne() {
	//dashText.text = 'Dash:  1s';
	let tween = game.add.tween(dashBar).to( {width: 192},1000,Phaser.Easing.Linear.None,true);
	dashTimer1Aud.play();
	game.time.events.add(Phaser.Timer.SECOND * 1, changeToReady, this);
}

function changeToReady() {
	//dashText.text = 'Dash:  READY!';
	let tween = game.add.tween(dashBarFull).to( {alpha:1},1,"Linear",true);
	dashTimer2Aud.play();
}
