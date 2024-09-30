export class caja extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
      
        // Añadir el slime a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.objetos.add(this)
        scene.physics.add.collider(this, scene.fondo)
        scene.physics.add.collider(this, scene.jugadores)
    }
}