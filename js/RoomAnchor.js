//Room anchor prefab
function RoomAnchor(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, null, null);

    game.add.existing(this); 

    this.anchor.set(0.5);
}

RoomAnchor.prototype = Object.create(Phaser.Sprite.prototype);
RoomAnchor.prototype.constructor = RoomAnchor;