function knockback(object,force,angle){
	player.body.drag.x = 1000; //TESTCODE
	object.body.velocity.x -= Math.cos(angle) * force;
	object.body.velocity.y -= Math.sin(angle) * force;
}