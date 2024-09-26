export class magia extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, radius, color, alpha) {
        super(scene, x, y, radius, 0, 360, false, color, alpha);
  
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}