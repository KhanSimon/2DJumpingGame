export function update ()
{
this.physics.world.wrap(this.player, 0, true, false, false);
this.background.tilePositionY -= 1 ;
this.nebulates.tilePositionY -= 3;
this.planets.tilePositionY -= 3;


if (this.cursors.left.isDown && (! this.player.body.touching.down))
{
    this.player.setVelocityX(-160);

    this.player.anims.play('left', true);
}
else if (this.cursors.left.isDown && this.player.body.touching.down)
{
    this.player.setVelocityX(-16);

    this.player.anims.play('left', true);
}
else if (this.cursors.right.isDown && (! this.player.body.touching.down))
{
    this.player.setVelocityX(160);

    this.player.anims.play('right', true);
}
else if (this.cursors.right.isDown && this.player.body.touching.down)
{
    this.player.setVelocityX(16);

    this.player.anims.play('right', true);
}
else
{
    this.player.setVelocityX(0);
}

if (this.cursors.up.isDown)
{
    this.player.setVelocityY(-330);
    this.player.anims.play('up');
}

if (this.player.body.touching.down)
{
    this.player.anims.play('static');
}



}

